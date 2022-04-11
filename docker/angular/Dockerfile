FROM node:14-alpine as dev

# Add .bin folder in node_modules folder to path
# Needed to use local ng etc.
ENV PATH="/usr/src/node_modules/.bin:${PATH}"

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Oslo /etc/localtime

# Create app directory
WORKDIR /usr/src

FROM dev as build

ARG ENVIRONMENT

COPY . .

RUN npm ci

RUN cp src/environments/environment.ts.example src/environments/environment.ts

RUN ng build --configuration=${ENVIRONMENT}

FROM nginx:1.21-alpine as prod

WORKDIR /var/www/app

COPY --from=build /usr/src/dist/admin-web/ /var/www/app/
COPY docker/nginx/default.prod.conf /etc/nginx/conf.d/default.conf

# Forward error log to docker log collector
RUN ln -sf /dev/stderr /var/log/nginx/admin-error.log
