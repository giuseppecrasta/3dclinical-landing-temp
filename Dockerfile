# ===============================================
# Stage 1: Build dependencies and compile code
# ===============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy patches if they exist
COPY patches ./patches

# Install all dependencies (including dev dependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source code and configuration files
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY tsconfig.json tsconfig.node.json vite.config.ts components.json ./

# Build both frontend and backend
# This runs: vite build (frontend) && esbuild server/index.ts (backend)
RUN pnpm run build

# ===============================================
# Stage 2: Production runtime
# ===============================================
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy only the built artifacts from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist/index.js ./index.js
COPY --from=builder --chown=nodejs:nodejs /app/dist/public ./public

# Create a minimal package.json for production dependencies only
RUN echo '{"name":"3d-clinical-backend","version":"1.0.0","type":"module"}' > package.json

# Install only production dependencies needed at runtime
# The bundled index.js has most dependencies included via esbuild, but --packages=external means we need these at runtime
RUN npm install --no-save \
    express@^4.21.2 \
    express-rate-limit@^7.5.0 \
    nodemailer@^8.0.1 \
    dotenv@^17.3.1 && \
    npm cache clean --force

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the server
CMD ["node", "index.js"]
