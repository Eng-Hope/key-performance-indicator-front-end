FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm install -g serve

# Serve on 0.0.0.0 and port 3000 (or $PORT if Render provides it)
CMD ["serve", "-s", "out", "-l", "3000", "-h", "0.0.0.0"] 