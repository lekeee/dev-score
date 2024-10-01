FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD [ "npm", "start", "--", "--host", "0.0.0.0" ]