FROM node:18-alpine AS base

# Встановлюємо залежності для збірки
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копіюємо файли залежностей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Збірка додатку
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Встановлюємо змінні середовища для production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Створюємо production збірку
RUN yarn build

# Production образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Автоматично використовуємо output 'standalone'
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 