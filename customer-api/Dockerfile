# ---- build ----
    FROM node:20-alpine AS build
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ---- runtime ----
    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    
    COPY package*.json ./
    RUN npm install
    
    COPY --from=build /app/dist ./dist
    
    EXPOSE 8080
    CMD ["node", "dist/server.js"]