FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait_for_Rabbit.sh /wait_for_Rabbit.sh
RUN chmod +x /wait_for_Rabbit.sh

CMD ["/wait_for_Rabbit.sh", "node", "index.js"]

