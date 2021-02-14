FROM node:12-alpine
ENV NODE_ENV=production

WORKDIR /order

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]
