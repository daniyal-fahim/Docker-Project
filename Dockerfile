FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait_for_Rabbit.sh /wait_for_Rabbit.sh
RUN chmod +x /wait_for_Rabbit.sh

CMD ["sh", "/wait_for_Rabbit.sh", "node", "index.js"]