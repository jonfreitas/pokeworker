FROM docker.devops.somosdigital.io/node:12-alpine

WORKDIR /app

COPY . ./
RUN npm rebuild --target_platform=linux --target_arch=x64

CMD ["node", "dist/index.js"]
