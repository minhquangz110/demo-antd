
FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN yarn install && yarn build 


FROM node:18-alpine AS runner

WORKDIR /app

COPY . .

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/package.json ./package.json


CMD [ "yarn", "start" ]

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json ./

# COPY yarn.lock ./

# RUN yarn install --frozen-lockfile

# COPY . .


# CMD ["npm", "start"]