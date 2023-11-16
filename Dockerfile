FROM node:lts-alpine

WORKDIR /app

COPY /testTask_frontend/package*.json ./

RUN npm install

COPY /testTask_frontend .

CMD ["npm", "run", "dev"]
