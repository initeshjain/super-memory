# ----------------------
# 1. Install dependencies only when needed
# ----------------------
FROM node:22-alpine AS deps

# Enable corepack to use pnpm
RUN corepack enable

WORKDIR /app

# Add packageManager field to package.json to ensure consistent pnpm version (recommended)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# ----------------------
# 2. Rebuild the source code only when needed
# ----------------------
FROM node:22-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .

RUN pnpm build


# ----------------------
# 3. Production image
# ----------------------
FROM node:22-alpine AS runner

RUN corepack enable

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

EXPOSE 3000

CMD ["pnpm", "start"]
