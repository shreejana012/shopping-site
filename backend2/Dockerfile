FROM node:12-alpine
ENV NODE_ENV=production

WORKDIR /notification

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "notification.js" ]
