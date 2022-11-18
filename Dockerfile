FROM node:19 as build

COPY . /app/

WORKDIR /app

RUN npm ci
RUN npm run build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html
