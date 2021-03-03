FROM node:12.18.3

RUN mkdir /docs
WORKDIR /docs

COPY package.json ./
COPY yarn.lock ./
COPY src ./

RUN yarn

EXPOSE 3001
ENTRYPOINT ["yarn"]
CMD ["start"]
