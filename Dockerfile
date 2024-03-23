# Stage 1: Build
FROM node:20.2-alpine3.17 as build
WORKDIR /app
COPY /app/package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:20.2-alpine3.17
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
RUN npm install --only=production
CMD ["npm", "start"]
