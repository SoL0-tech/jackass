FROM node:slim
LABEL MAINTAINER="Jared Murphy <jlmurphy.sa@gmail.com>"

RUN mkdir -p /www
COPY package.json yarn.lock /www/
WORKDIR /www

RUN yarn

EXPOSE 3000
CMD ["node", "./src/server.js"]

