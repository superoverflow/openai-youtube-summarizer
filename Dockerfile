FROM node:bookworm

WORKDIR /usr/app

COPY ./ /usr/app
RUN npm install

RUN npm install
CMD ["npm", "run", "worker"]
