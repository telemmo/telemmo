FROM node:alpine

RUN apk add --no-cache git

WORKDIR /build

COPY . /build
RUN env NODE_ENV="development" npm install
RUN npm run dist

WORKDIR /app

RUN mv /build/dist/telemmo* /app \
    && mv /build/node_modules /app \
    && rm -rf /build \
    && rm -rf \
    && apk del git

CMD node /app/telemmo.js
