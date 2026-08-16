# Production runner stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Safely copy files (only copy public if it exists, or create a dummy one)
RUN mkdir -p ./public
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]