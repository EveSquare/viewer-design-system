FROM node:16.14

WORKDIR /usr/src/app
RUN apt-get update && yarn