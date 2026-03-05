FROM node:20-alpine

WORKDIR /app

# Copy the built backend
COPY dist/index.js ./

# Copy public folder for serving static files
COPY dist/public ./public

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "index.js"]
