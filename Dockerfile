
FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN yarn install  && yarn build 


FROM node:18-alpine AS runner

WORKDIR /app

COPY . .

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/package.json ./package.json


CMD [ "yarn", "start" ]

FROM nginx:1.19.10-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]