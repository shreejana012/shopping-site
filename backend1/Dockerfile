FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the shopping site order API."
LABEL maintainer = "shrijana460@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN ls node_modules
EXPOSE 5001

CMD ["node", "server.js"]
