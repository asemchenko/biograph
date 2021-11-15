FROM node:10-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod

FROM nginx:latest
COPY --from=build /usr/local/app/dist/biograph-frontend /usr/share/nginx/html
EXPOSE 80
