FROM node:lts-hydrogen

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY build/ src/

CMD [ "npm", "start" ]
EXPOSE 3000