FROM node:14
ENV  NODE_ENV=dev

WORKDIR /auth

COPY ["package.json", "package-lock.json", "./"]

COPY .env ./

RUN npm install

COPY . .

CMD [ "node", "server.js"]