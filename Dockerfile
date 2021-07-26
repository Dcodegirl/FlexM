FROM node:12.18.1-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
COPY .env.prod /usr/src/nuxt-app/.env
RUN yarn install

ENV GENERATE_SOURCEMAP=false

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn run build 

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "yarn", "start" ]