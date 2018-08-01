FROM node:slim
LABEL MAINTAINER="Jared Murphy <jlmurphy.sa@gmail.com>"

RUN mkdir -p /www
COPY package.json yarn.lock angular.json tsconfig.json /www/
# RUN mkdir /www/src
# COPY src /www/src/
WORKDIR /www

RUN yarn

EXPOSE 4200
CMD ["./node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]

