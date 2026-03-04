FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

FROM node:24-alpine

RUN apk update && apk upgrade --no-cache && \
    addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
