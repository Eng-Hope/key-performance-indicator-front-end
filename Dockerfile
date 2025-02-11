FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Install serve
RUN npm install -g serve

# Serve the app
CMD ["serve", "-s", "out", "-l", "80"] 