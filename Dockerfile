FROM node:alpine as builder
WORKDIR /app
COPY  . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx-custom.conf /etc/nginx/conf.d/default.conf