FROM node:16
MAINTAINER greatSumini@gmail.com

# create app dir
WORKDIR /usr/src/app

# copy package.json/package-lock.json, install dependencies
COPY package*.json ./
RUN npm install

ENV PORT=4413
ENV IP="0.0.0.0"

# copy app source
COPY . .

RUN npm run build

EXPOSE 4413

CMD [ "node", "dist/main" ]
