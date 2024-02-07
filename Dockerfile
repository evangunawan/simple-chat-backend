FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]