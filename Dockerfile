# Usa una imagen base de Node en versión LTS
FROM node:22-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]