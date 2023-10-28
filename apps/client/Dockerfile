# Etapa de construcción
FROM node:latest AS BUILDER

WORKDIR /app

# Copia los archivos de paquetes y instala las dependencias
COPY package*.json ./
RUN npm install --silent

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM node:latest AS PROD

WORKDIR /app

# Instala el paquete "serve" globalmente
RUN npm install -g serve

# Copia los archivos construidos desde la etapa BUILDER
COPY --from=BUILDER /app/dist ./dist

# Expone el puerto 3000
EXPOSE 3000

# Sirve la aplicación usando "serve"
CMD ["serve", "-s", "dist", "-l", "3000"]