FROM node:alpine

WORKDIR /server

COPY ./package.json .

RUN npm install

COPY ./ .

CMD ["npm", "start"]