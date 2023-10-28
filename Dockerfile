# Usa una imagen base de Node.js
FROM node:18 as BASE

# Establece el directorio de trabajo
WORKDIR /usr/src/apps

# Copia package.json al entorno de Docker
COPY ./apps/client/package.json ./
COPY ./apps/server/package.json ./

# Instala todos los paquetes de Node
RUN npm install
RUN cd ./usr/src/apps/server && npm install
RUN cd ./usr/src/apps/client && npm install

# Copia todo a Docker
COPY . . 

RUN cd ./usr/src/apps/server && npx prisma generate && npm run build
RUN cd ./usr/src/apps/client && npm run build

# Establece la imagen base de Node.js
FROM node:18 as RELEASE

WORKDIR /usr/src/apps

# Copia package.json al entorno de Docker
COPY --from=BASE ./usr/src/apps/server/package.json ./
COPY --from=BASE ./usr/src/apps/client/package.json ./

# Instala todos los paquetes de Node
RUN npm install --omit=dev
RUN npm install -g ts-node

# Copia la aplicación construida (Typescript) desde la etapa 'base'
COPY --from=BASE ./usr/src/apps/server/dist ./dist
COPY --from=BASE ./usr/src/apps/client/build ./build

# Copia la carpeta prisma
COPY --from=BASE ./usr/src/apps/server/prisma ./prisma

COPY --from=BASE ./usr/src/apps/entrypoint.sh ./entrypoint.sh

# Copia tsconfig
COPY --from=BASE ./usr/src/apps/server/tsconfig.json ./tsconfig.json
COPY --from=BASE ./usr/src/apps/server/tsconfig.build.json ./tsconfig.build.json
COPY --from=BASE ./usr/src/apps/client/tsconfig.json ./tsconfig.json
COPY --from=BASE ./usr/src/apps/client/tsconfig.build.json ./tsconfig.build.json

EXPOSE 3000 4000

CMD ["/bin/bash", "./usr/src/apps/server/entrypoint.sh"]

