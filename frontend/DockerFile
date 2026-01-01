
    FROM node:20-alpine AS build
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci || npm install
    
    COPY . .
    
    ARG VITE_AUTH_API
    ARG VITE_TODO_API
    ENV VITE_AUTH_API=$VITE_AUTH_API
    ENV VITE_TODO_API=$VITE_TODO_API
    
    RUN npm run build
    
    FROM nginx:alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 80
    