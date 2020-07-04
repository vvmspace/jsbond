FROM node:12-alpine

WORKDIR /icu
RUN npm init -y && npm install full-icu
ENV NODE_ICU_DATA=/icu/node_modules/full-icu

WORKDIR /app/src
COPY package.json ./
RUN npm install
COPY . .

#ADD crontab /etc/cron.d/exec
#RUN chmod 0644 /etc/cron.d/exec

RUN npm run build:docker

CMD npm run start:docker