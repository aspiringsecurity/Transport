FROM docker.io/library/node:18-slim AS node

FROM node AS node-with-gyp
RUN apt update -y && apt install -y g++ make python3 tini

FROM node-with-gyp AS builder
WORKDIR /app
ADD package.json .
ADD yarn.lock .
RUN yarn --frozen-lockfile
ADD tsconfig.json .
ADD src src
RUN yarn build

FROM node-with-gyp AS deps
WORKDIR /app
ADD package.json .
ADD yarn.lock .
RUN yarn --frozen-lockfile --production

FROM node AS processor
WORKDIR /app
COPY --from=deps /app/package.json .
COPY --from=deps /app/node_modules node_modules
COPY --from=builder /app/lib lib
COPY --from=deps /usr/bin/tini /usr/bin/tini
ADD db db
ADD indexer/typesBundle.json indexer/
ADD schema.graphql .
ENTRYPOINT [ "tini", "--", "node", "lib/processor.js" ]
ENV PROCESSOR_PROMETHEUS_PORT 3000
EXPOSE 3000
