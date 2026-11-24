FROM node:22-alpine AS build

ARG APP_VERSION=1.0
ARG APP_ENV=production

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
ENV VITE_APP_VERSION=${APP_VERSION} \
    APP_ENV=${APP_ENV}

RUN npm run build


FROM node:22-alpine AS production

ARG APP_VERSION=1.0
ARG APP_ENV=production

ENV APP_VERSION=${APP_VERSION} \
    APP_ENV=${APP_ENV}

WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]