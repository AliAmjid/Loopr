FROM node:12.18.3

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["dev"]
