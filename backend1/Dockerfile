FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the shopping site order API."
LABEL maintainer = "shrijana460@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . .

EXPOSE 5001

CMD ["node", "server.js"]
