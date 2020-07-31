FROM node:12.16.3

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ ./

RUN yarn prod:build

EXPOSE 3000
CMD ["yarn","prod:start"]
