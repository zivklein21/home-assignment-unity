# Step 1: Build React app
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default files
RUN rm -rf ./*

# Copy build from builder
COPY --from=builder /app/build .

# Optional: replace nginx config (supports React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf