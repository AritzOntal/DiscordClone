FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Comando para arrancar: Aplica migraciones y arranca en producción
CMD [ "sh", "-c", "npx prisma migrate deploy && npm run start:prod" ]