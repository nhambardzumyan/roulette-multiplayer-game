FROM node:22-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:22-alpine

WORKDIR /usr/bin/app
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*json .
RUN npm prune --omit=dev

EXPOSE 8002
CMD ["npm", "start"]
