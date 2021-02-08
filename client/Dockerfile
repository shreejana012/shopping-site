FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the shopping site client"
LABEL maintainer = "shrijana460@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 3000

CMD ["npm", "start"]