FROM node:6.2.1

RUN npm install -g http-server

WORKDIR /app
COPY package.json /app
RUN npm install

COPY dist/. /app

EXPOSE 8080
CMD ["http-server"]