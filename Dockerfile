FROM mhart/alpine-node
LABEL author="borzou@theboeffect.com"
RUN mkdir /app

COPY . /app
WORKDIR /app
RUN yarn --production
RUN yarn run build-ui

EXPOSE 3000

CMD ["yarn", "start"]