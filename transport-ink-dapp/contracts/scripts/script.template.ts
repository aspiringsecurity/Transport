import { ContractPromise } from '@polkadot/api-contract'
import { contractQuery, contractTx, decodeOutput, deployContract } from '@scio-labs/use-inkathon'
import * as dotenv from 'dotenv'
import { getDeploymentData } from './utils/getDeploymentData'
import { initPolkadotJs } from './utils/initPolkadotJs'

// [KEEP THIS] Dynamically load environment from`.env.{chainId}`
const chainId = process.env.CHAIN || 'development'
dotenv.config({ path: `.env.${chainId}` })

/**
 * Example script that updates & reads a message from a greeter contract.
 * Can be used as a template for other scripts.
 *
 * Parameters:
 *  - `DIR`: Directory to read contract build artifacts (optional, defaults to `./deployments`)
 *  - `CHAIN`: Chain ID (optional, defaults to `development`)
 *
 * Example usage:
 *  - `pnpm run script <script-name>`
 *  - `CHAIN=alephzero-testnet pnpm run script <script-name>`
 */
const main = async () => {
  // [KEEP THIS] Initialization
  const accountUri = process.env.ACCOUNT_URI || '//Alice'
  const { api, chain, account } = await initPolkadotJs(chainId, accountUri)

  // Deploy greeter contract
  const { abi, wasm } = await getDeploymentData('greeter')
  const { address } = await deployContract(api, account, abi, wasm, 'default', [])
  const contract = new ContractPromise(api, abi, address)

  // Update message
  try {
    await contractTx(api, account, contract, 'set_message', {}, ['Hello, script!'])
    console.log('\nSuccessfully updated greeting')
  } catch (error) {
    console.error('Error while updating greeting', error)
  }

  // Read message
  const result = await contractQuery(api, '', contract, 'greet')
  const { decodedOutput } = decodeOutput(result, contract, 'greet')
  console.log('\nQueried greeting:', decodedOutput)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
