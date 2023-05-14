process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


codegen:
	@npx squid-typeorm-codegen


typegen:
	@npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d


down:
	@docker-compose down

explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://rpc-crust-mainnet.decoo.io \
		--archive https://crust.archive.subsquid.io/graphql \
		--out crustVersions.json

.PHONY: process serve start codegen migration migrate up down
