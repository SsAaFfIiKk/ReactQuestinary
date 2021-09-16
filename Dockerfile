FROM alpine

#RUN apk add --update nodejs nodejs-npm
RUN apk add --update nodejs npm
# RUN npm install -g http-server
WORKDIR /app
# COPY . /app/
# RUN cd /app && npm install --pure-lockfile
COPY . .
RUN npm install
RUN npm run-script build
EXPOSE 7373
ENV HOST 0.0.0.0
CMD npm start