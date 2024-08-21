FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
# RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# FROM nginx:latest
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]