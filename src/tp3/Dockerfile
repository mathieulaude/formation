FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install && npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
