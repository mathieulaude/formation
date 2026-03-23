FROM node:25-alpine

RUN apk -U add --no-cache curl

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1
CMD node server.js

EXPOSE 3000
