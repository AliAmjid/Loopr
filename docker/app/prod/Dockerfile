FROM node:12.18.3

RUN mkdir /app
WORKDIR /app

ARG NEXT_PUBLIC_DISABLE_TOUR
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_DISABLE_TOUR=$NEXT_PUBLIC_DISABLE_TOUR
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_DOCS_URL=$NEXT_PUBLIC_DOCS_URL
ENV NEXT_PUBLIC_DOCS_URL=$NEXT_PUBLIC_DOCS_URL

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000
CMD ["yarn","start"]
