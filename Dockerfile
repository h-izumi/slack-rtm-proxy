FROM node:alpine

LABEL maintainer="h-izumi@9uelle.jp"

RUN apk add --no-cache git && \
  git clone https://github.com/h-izumi/slack-rtm-proxy.git && \
  apk del git

RUN cd slack-rtm-proxy && \
  yarn install

CMD cd /slack-rtm-proxy && node index.js
