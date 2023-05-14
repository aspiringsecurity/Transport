#!/usr/bin/env bash
source .env


if [ "${ARCHIVE_ENDPOINT}" == 'https://interlay.archive.subsquid.io/graphql' ]; then
  docker-compose up -d db-interlay
elif [ "${ARCHIVE_ENDPOINT}" == 'https://kintsugi.archive.subsquid.io/graphql'  ]; then
  docker-compose up -d db-kintsugi
elif [ "${ARCHIVE_ENDPOINT}" == 'https://api-testnet.interlay.io/subsquid-gateway/graphql' ]; then
  docker-compose up -d db-interlay-testnet
elif [ "${ARCHIVE_ENDPOINT}" == "https://api-dev-kintsugi.interlay.io/subsquid-gateway/graphql" ]; then
  docker-compose up -d db-kintsugi-testnet
else
  echo "Environment Variables are not properly set"
  exit 1
fi

if [ -f ~/.nvm/nvm.sh ]; then
  . ~/.nvm/nvm.sh
elif command -v brew; then
  BREW_PREFIX=$(brew --prefix nvm)
  if [ -f "$BREW_PREFIX/nvm.sh" ]; then
    . $BREW_PREFIX/nvm.sh
  fi
fi

yarn install
yarn build
yarn db:migrate
yarn processor:start
