FROM node:25

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /app

COPY . .

RUN npm install

CMD node server.js

EXPOSE 3000
