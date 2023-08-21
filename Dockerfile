FROM node:18-alpine

WORKDIR /usr/app
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY ./ /usr/app
RUN npm install

CMD ["npm", "run", "serve"]