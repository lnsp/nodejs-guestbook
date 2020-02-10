FROM node

WORKDIR /app
COPY . /app
RUN npm install

CMD ["server.js"]
