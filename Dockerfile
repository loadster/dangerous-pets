FROM node:22

RUN apt-get update && apt-get install -y tini
ENTRYPOINT ["/usr/bin/tini", "--"]

WORKDIR /app

# Copy package files
COPY api/package*.json ./api/
COPY web/package*.json ./web/

# Install dependencies
RUN cd api && npm ci
RUN cd web && npm ci

# Copy source files
COPY api ./api/
COPY web ./web/

# Build frontend
RUN cd web && npm run build

EXPOSE 3001

CMD ["node", "/app/api/src/index.js"]
