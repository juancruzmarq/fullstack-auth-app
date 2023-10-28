FROM node:18.17.0 AS BUILDER

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.17.0 AS PROD

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=BUILDER /app/dist ./dist

CMD ["npm", "run", "start:prod"]


