# Production image: build frontend and serve via nginx
FROM node:20-alpine AS builder
ARG VITE_BASE_PATH=/wedding/
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/eslint.config.js ./
COPY frontend/tsconfig.node.json ./
COPY frontend/tsconfig.app.json ./
RUN npm install

# Copy source
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./

# Build static assets
RUN npm run build

# Production runtime
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist ./wedding
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
