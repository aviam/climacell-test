FROM node:alpine
RUN mkdir /app
#app folder in jenkins folder where checkout code...
COPY ./app /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
