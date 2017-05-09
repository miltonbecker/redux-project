FROM node:7-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

EXPOSE 8000

CMD [ "npm", "start" ]

LABEL maintainer="miltonbecker@gmail.com"