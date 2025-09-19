# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the app with environment variables
ARG VITE_API_BASE_URL_CLIENT
ARG VITE_API_BASE_URL_PRODUIT
ARG VITE_API_BASE_URL_COMMANDE
ENV VITE_API_BASE_URL_CLIENT=$VITE_API_BASE_URL_CLIENT
ENV VITE_API_BASE_URL_PRODUIT=$VITE_API_BASE_URL_PRODUIT
ENV VITE_API_BASE_URL_COMMANDE=$VITE_API_BASE_URL_COMMANDE
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
