FROM node:12.18.2-alpine3.11

ADD . /home/node/app

RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "app.js"]