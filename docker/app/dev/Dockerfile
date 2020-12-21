FROM node:12.18.3

RUN mkdir /app
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ARG REACT_APP_API_ENTRYPOINT

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["dev"]
