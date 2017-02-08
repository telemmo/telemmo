FROM node:alpine

RUN apk add --no-cache git

WORKDIR /build

COPY . /build

RUN env NODE_ENV="development" npm install --quiet \
    && npm run dist \
    && npm prune --production --quiet \
    && mkdir -p /app \
    && mv dist/telemmo* /app \
    && mv node_modules /app \
    && rm -rf /build \
    && apk del git

WORKDIR /app

CMD node /app/telemmo.js
