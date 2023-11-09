# FROM node:18.15-alpine
FROM node:18.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g cross-env

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
