FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Install serve
RUN npm install -g serve

# Serve the app on port 3000
CMD ["serve", "-s", "out", "-l", "3000"] 