# 1. Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Ensure public directory exists
RUN mkdir -p ./public

# Copy source code and build
COPY . .
RUN npm run build

# 2. Production runner stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built assets and production node_modules from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]