FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY .env ./

RUN pnpm install --frozen-lockfile

COPY . .
