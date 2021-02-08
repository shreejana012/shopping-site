FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the shopping site notification API."
LABEL maintainer = "shrijana460@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
COPY package.json /app
RUN ls
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 5002

CMD ["node", "notification.js"]