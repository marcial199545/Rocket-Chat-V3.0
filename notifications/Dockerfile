FROM node:10-alpine as  build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-prod

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=build-stage ./usr/src/app/dist ./dist

EXPOSE 5001

CMD ["npm","run","start"]