FROM node:20-alpine AS build
WORKDIR /usr/src/app

ARG NEXT_PUBLIC_IDENTITY_API_URL=http://127.0.0.1:3000/api/v1
ARG NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3001
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_APP_VERSION=

ENV NEXT_PUBLIC_IDENTITY_API_URL=$NEXT_PUBLIC_IDENTITY_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS web

ENV TZ=Asia/Jakarta
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    echo "Asia/Jakarta" > /etc/timezone

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/out /usr/share/nginx/html

EXPOSE 3001
