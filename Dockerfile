FROM node:8.11.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
run yarn && yarn cache clean
COPY . /usr/src/app

CMD ["sh","run"]