FROM node:12.18.1
ENV  NODE_ENV=dev

WORKDIR /auth

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run start