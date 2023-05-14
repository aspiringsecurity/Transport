# interBTC Squid

Squid project that indexes interBTC chains (testnet, Kintsugi, and Interlay networks). Built with [squid](https://github.com/subsquid/squid).

## Overview

### High Level

![image](https://user-images.githubusercontent.com/14966470/202604252-d6cab206-1553-4789-bc37-851ad7943c10.png)

### Lower Level

1. The **archive** crawls chain and collects block data (incl. events and extrinsics).
2. The **gateway** makes this data available through a fast GraphQL endpoint. The gateway is accessible online, e.g., for diagnostics or easy access to raw block data.
3. The **processor** ingests this raw data and runs a number of user-defined mapping functions.
4. These mappings ingest parachain events and save user-defined entities. For example: `Issue`, or `IssueCancellation`, or `OracleUpdate`
5. GraphQL node then makes these entities available to be consumed in front-end.

![image](https://user-images.githubusercontent.com/14966470/202604314-4b4c93f6-cb24-4deb-91dd-fefc2f73e063.png)

### Deployed squid instances

Please check the Interlay GraphQL API docs for currently deployed versions of squid: https://docs.interlay.io/#/developers/api?id=graphql-apis

## Prerequisites

* Node v16x
* Docker
* Docker compose (for development)

## Important Notes

For development work and questions around squid development, please refer to the [subsquid docs](https://docs.subsquid.io/overview/).

The following files are required for pre-v14 chains (**do not edit**):
- `indexer/types.json`
- `indexer/typesBundle.json`

The `distributable` files should be re-generated with `gen:distributables` (**do not edit**).

## Development

### Quick bootstrap

```bash
# Ensure you are on node 16
nvm use 16

# Install and build
yarn install
yarn build

# Start a postgres instance
docker-compose up db -d # add optional -d flag to detach from terminal

# Apply the project's migrations
yarn db:migrate

# Now you can start processing chain data
yarn processor:start

# The above command will block
# Open a separate terminal and launch the graphql server to query the processed data
yarn query-node:start
```

#### Save time and effort by using the following script instead of doing the above steps manually:
`./runProcessor`

Access the GraphQL IDE here: http://localhost:4000/graphql

### Workflow - developing the processor

When making changes to the processor (e.g. adding a new event), you may wish to reset the database to restart processing the chain from scratch.

```bash
# -v removes named volumes declared in the volumes section of the Compose file and anonymous volumes attached to containers.
docker-compose down -v
```

Then you can

```bash
docker-compose up -d db
yarn build
yarn processor:start
```

The query-node doesn't need to be restarted as it is stateless.

The mappings also use the `Debug` package, whose output can be enabled by passing the `DEBUG` variable. E.g. `DEBUG="*"` will enable all debug output, or `DEBUG="interbtc-mappings:issue"` will enable printouts only from the issue event mappings (in `src/mappings/event/issue.ts`).

### Workflow - connecting to a specific chain

The processor processes events from a specific parachain. The `.env` file controls which URLs the processor uses for the archive node/indexer, and for the parachain RPC. Both should correspond to the same chain, and whichever these are set to will be the chain used for processing.

Note that the typings and metadata should match the currently used chain. See [this section](#workflow---updating-chain-metadata) below for more info on that.

Additionally, the `SS58_CODEC` variable should be set to `interlay` for Interlay mainnet, `kintsugi` for Kintsugi canarynet, and `substrate` for the testnets or local development. `BITCOIN_NETWORK` is `mainnet` for the mainnets, `testnet` for the testnets, and `regtest` for a local regtest node.

`PROCESS_FROM=540000` should be set for Kintsugi, but can be left at 0 for other nodes. It can also be set to whatever value desired for development - but be wary of dependence on historic events, e.g. IssueRequest events will fail to process if they're made against a `vault` whose `RegisterVault` event has not been processed.

### Workflow - updating chain metadata

Squid auto-generates types from parachain metadata.

This is a two-step process:

1. Dump ("explore") the metadata versions.
2. Use the metadata json to generated Typescript definition files.

This needs to be done every time a network has a runtime upgrade, which will likely create a new metadata version and may (or may not) also alter the types. If the types are altered, mappings in the processor will also need to be updated for the new types.

#### Deployment Branches

Because different networks will have different metadata histories, currently developing against different networks requires regenerating metadata.

For deployment, therefore, parallel branches are maintained. Currently:

* `master` uses Kintsugi metadata (and is deployed on Kintsugi and Interlay, which match)
* `testnet` uses kint-testnet metadata (and is deployed on kintnet)

This may change as a) Interlay diverges, and a new branch is created for it; and b) even decoding is abstracted and the need for separate branches is obviated.

However, until the abstraction is implemented, you will need to switch between branches and metadatas to develop on different networks.

#### Interlay and Kintsugi

Updating Interlay:

```bash
yarn gen:explore:interlay
yarn gen:types:interlay
```

Updating Kintsugi:

```bash
yarn gen:explore:kintsugi
yarn gen:types:kintsugi
```

#### Testnets

Assumes that Interlay and Kintsugi testnets are always at the same versions.

```bash
yarn gen:explore:testnet
yarn gen:types:testnet
```

### Workflow - updating the SQL schema

The GraphQL entities are defined in `schema.graphql`. When the schema is changed:

1. Ensure your DB is running and up to date (e.g. you recently ran `yarn db:migrate`)
2. Run `yarn gen:code` to regenerate TypeScript types for the GraphQL entities.
3. Run `yarn build` to compile the newly generated code.
4. Run `yarn db:create-migration`, and enter a name for the migration. This will auto-generate it.
5. Run `yarn db:migrate` to apply your new migration.
6. You can now develop the mappings against the new entities.

### Workflow - connecting to a local chain

Given the metadata mismatches described above, it is often a good idea to run directly against existing chains, but for heavy development it can be easier to use a local chain which gives you full control over the events that happen and avoids the need to process thousands of superfluous blocks with no interesting data.

For this, a docker-compose file is provided under `indexer`. As it's not frequently maintained, first edit it and ensure the components are the correct up-to-date version, including `interbtc`, `oracle`(s), `faucet` and `vault`. Then you may start it, which will run a local chain instance as well as the Squid indexer/archive for it. The ports for the various databases should be pre-configured to work.

Then simply switch the URLs in .env to your local archive/indexer and chain (`http://localhost:4010/v1/graphql` and `ws://localhost:9944`, normally). You can then proceed with development as normal - `docker-compose up` in the root to bring up the processor's database, `yarn build` and `yarn processor:start`. You may need to regenerate the metadata.

Once development is completed, always double-check that it works with metadata from the actual live chains.

## Help

### Docker

You can hard-reset the docker dependency setup with the following commands:

```bash
# DANGER ZONE: This will reset ALL docker containers on your machine.
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker volume rm $(docker volume ls -q)
```
