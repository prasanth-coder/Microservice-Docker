
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./


RUN npm ci || npm install
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
