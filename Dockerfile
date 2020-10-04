FROM nginx:1.13.3-alpine

COPY /dist/lukapp-client /usr/share/nginx/html

