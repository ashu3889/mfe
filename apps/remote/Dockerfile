# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run Express production server
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

# Copy built static files from builder stage
COPY --from=builder /app/dist ./dist
# Copy the Express server script
COPY server.js ./

EXPOSE 80
CMD ["node", "server.js"]