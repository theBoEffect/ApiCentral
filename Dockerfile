FROM mhart/alpine-node
LABEL author="borzou@theboeffect.com"
RUN mkdir /app

COPY . /app
WORKDIR /app
RUN yarn
RUN yarn run settings
WORKDIR /app/portal
RUN yarn
RUN yarn build
WORKDIR /app
RUN yarn test

EXPOSE 3000

CMD ["yarn", "start"]