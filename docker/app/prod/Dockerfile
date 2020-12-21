FROM node:12.18.3

RUN mkdir /app
WORKDIR /app

ENV DISABLE_TOUR 1
ARG API_URL
ENV API_URL=$API_URL

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000
CMD ["yarn","start"]
