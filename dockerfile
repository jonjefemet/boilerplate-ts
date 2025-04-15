FROM node:23-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm @nestjs/cli

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN nest build ${APP_NAME}

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "nest start $APP_NAME"]