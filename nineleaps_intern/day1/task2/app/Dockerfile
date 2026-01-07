FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production --no-optional

# Copy ALL app files
COPY . .  

EXPOSE 3000
CMD ["node", "server.js"]
