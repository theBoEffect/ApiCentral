FROM mhart/alpine-node
LABEL author="borzou@theboeffect.com"
RUN mkdir /app

COPY . /app
WORKDIR /app
RUN yarn
RUN yarn run build-ui
RUN yarn test
#RUN yarn run test-ui

EXPOSE 3000

CMD ["yarn", "start"]