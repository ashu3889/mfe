# 1. Builder stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN mkdir -p ./public
COPY . .
RUN npm run build

# 2. Production runner stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN mkdir -p ./public
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3001
CMD ["node", "server.js"]