# Open API Aggregation and Dev Portal Generator

This project allows you to register openAPI specs that are hosted in other services to a single accessible service and UI. The application persists these in a Mongo database and then makes them available in an aggregated portal for reference. This is designed as a quick and easy solution in the absence of an Enterprise API Gateway with a built-in mesh and dev portal. It's also useful as an in-network mechanism to organize all distributed APIs into a single queryable interface for developers. Future enhancements could allow data to be aggregated automatically through utilization of a mesh system like Istio, Consul, etc. Additions to the code are welcome - feel free to submit a pull request.

![CI](https://github.com/theBoEffect/ApiCentral/workflows/Node.js%20CI/badge.svg)

## Persistence

I chose Mongo as the database because I happen to have a cluster that I maintain, and the boilerplate I built and generally use ([see it here](https://github.com/theBoEffect/boilerplate)) has it already configured. That said, other options may be more suitable for this kind of data, and the code can easily be modified to use them. Specifically, a managed pay-as-you-go service (DynamoDB for example) would seem to be ideal, especially since this the project can be served via Lambda.

### Change DB

If you do decide to use a different database or ODM, the following modifications are necessary:

* change connection.js to the appropriate DB
* validate that /src/slsapp.js and /src/start.js both correctly implement connection.js
* in each of your api/resources, change the dal.js file to access the new DB using the new ODM/ORM

## Deployments

This project can be deployed to a traditional server, a Docker container (and subsequent orchestration system), or as a lambda function. The example deployment uses AWS Lambda. Additionally, this project is a mono-repo of the backend and frontend; however, the UI is an Angular 10 single spa application that could easily be deployed separately though a CDN if desired (though this would require a little modification to the code). Feel free to fork and play around.

### Example Deployment - Served via AWS Lambda

[Mail My Voice API](https://api.mailmyvoice.com)

### Docker

This repo does not pre-build a docker image for you. You'll want to build your own and store it in a container registry. From there its just a matter of running your image as a container. Here are the things to keep in mind:

* When you build your image, you'll want to define a /settings.json file that you inject into the container. The best way to do this will be to have a base image in your registry of this repo and then use that as part of a FROM command in a new dockerfile where you pull in a locally defined settings.json file into a new container which you will then run.
* When you go to run your docker image, make sure you're accounting for the required environment variables defined that correspond to those shown in /.env-ci/env.production.json.
    * "NODE_ENV"
        * i.e. production, qa, dev, etc.
    * "PROTOCOL"
        * i.e. http, https
    * "MONGO"
        * i.e. mongodb://mongodomain.com:27017/your-db
    * "SWAGGER"
        * i.e. your.domain.com
    * "REPLICA"
        * If your mongo is a replica set, name it here. Otherwise, ignore.
    * "PERSIST_HTTP_ERRORS"
        * True or False. Generally leave this false unless you're trying to debug specific http requests that are failing, and you can't view them clearly during runtime.
    * "WRITE_LOGS_TO_DB":
        * True or False. Generally leave this false unless you don't have anything scraping and storing logs like CloudWatch.
        
#### Local Docker Build

You can also build it locally (rather than through CI) and push the image to your orchestration system manually.

* Clone the project
* cp ./settings-default.json ./settings.json
* update settings
* docker build -t username/apicentral .

### Lambda

Lambda deployment is possible directly from the repo through serverless framework. Review the /serverless.yaml file for details of what happens.

* Assumptions
    * You have an aws account with appropriate permissions
    * You have serverless framework installed with appropriate access to your aws account
    * CI tooling is used
* You'll want to ensure you can include a custom /settings.json copied and modified from /settings-default.json
* Ensure your tooling is setting the following environment variables
    * "NODE_ENV"
        * i.e. production, qa, dev, etc.
    * "PROTOCOL"
        * i.e. http, https
    * "MONGO"
        * i.e. mongodb://mongodomain.com:27017/your-db
    * "SWAGGER"
        * i.e. your.domain.com
    * "REPLICA"
        * If your mongo is a replica set, name it here. Otherwise, ignore.
    * "PERSIST_HTTP_ERRORS"
        * True or False. Generally leave this false unless you're trying to debug specific http requests that are failing, and you can't view them clearly during runtime.
    * "WRITE_LOGS_TO_DB":
        * True or False. Generally leave this false unless you don't have anything scraping and storing logs like CloudWatch.
* From here you just need to run to following command through your tooling
    * yarn run deploy

#### Local Lambda Deploy

You can deploy to lambda manually as well. Assuming you have serverless framework installed and configured:

* Clone the project
* cp ./settings-default.json ./settings.json
* cp ./.env-ci ./.env
* update settings.json
* update .env/env.production.json
* SLS_ENV=production yarn run deploy
    * This tells serverless to use the values defined in env.production.json as the env variables

## CI

For continuous integration I've started things off with two possibilities: GitHub Actions (which you can see the status of above) or if you prefer, I have a starter Code Fresh config as well under /ci. The repo status will rely on GitHub Actions and runs the defined service tests. Neither of these include the deployment requirements included above. I'll leave that to you to customize.

## Query and Update Patterns

### oData Spec

https://www.odata.org/documentation/

### JSON Patch

http://jsonpatch.com/

## Local Development

### Docker

* Clone the project
* cp ./settings-default.json ./settings.json
* update settings
* docker-compose up
* http://localhost:3000
* TIPS
    * If you want to rebuild without cached content: "docker-compose up --no-cache"
    * If you have cached containers or dangling images messing up the build you can use "docker system prune"
    * If you want to delete all docker images not running its "docker system prune -a"


### Run Local Node

* Clone the project
* Somewhere on your system run: docker run -p 27017:27017 mongo
* yarn
* yarn run settings
* Update ./settings.json with your site settings
* yarn test
* yarn run build-ui
* yarn run dev
* http://localhost:3000

## UI Development

The UI its own embedded SPA project that simply builds to the parent public folder. This way it can easily be worked on separately or pulled out entirely. It is an angular 10 project under the /portal file. To develop or modify the UI do the following:

* Clone the project
* yarn
* yarn run settings
* cd portal/
* yarn test (optional)
* yarn start

From here all the normal angular commands would apply (i.e. ng). When you're ready you can do an "ng build" from this directory or go to the parent directory and do a "yarn build". This will trigger the appropriate angular static files to be added to the ./public folder of the main project where they will be served along with the service API at localhost:3000.

## Site Settings

Since this is a single tenant solution (one instance per organization requiring a portal), settings such as the company name, logo, and html metadata are defined in a static json file at the root of the project (./settings.json). This file is generated when you run "yarn run settings" from ./settings-default.json'. The UI is a complete SPA unto itself under the portal directory and expects its own default copy of this file, which is also created when you run "yarn run settings". When you follow the build instructions below, those settings are carried over to the portal project, so you only ever need to update the root ./settings.json file. In this way, if the solution is ever broken into two repos, you can decouple these and maintain settings separately. These files are ignored by git so you can make your customizations easily.

```
{
  "company": "theBoEffect LLC",
  "title": "theBoEffect Developer Portal",
  "logoUrl": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
  "bannerTitle": "REST API CENTRAL",
  "bannerStatement": "Lets Build Something",
  "bannerImage": "/assets/img/bg8.jpg",
  "infoBlocks": [
    {
      "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
      "title": "INFO YOU WANT",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "href": "/apis"
    },
    {
      "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
      "title": "THIS IS INTERESTING",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "href": "/apis"
    },
    {
      "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
      "title": "TOKENS",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "href": "/apis"
    }
  ],
  "twitter": "https://twitter.com/theboeffect",
  "facebook": null,
  "instagram": null,
  "linkedin": "https://www.linkedin.com/in/bmotlagh/",
  "footers": [
    {
      "text": "Terms and Conditions",
      "href": "/"
    },
    {
      "text": "Privacy Policy",
      "href": "/"
    },
    {
      "text": "Contact",
      "href": "/"
    }
  ],
  "formspree": "abcd123",
  "aboutCompanyUrl": "https://theboeffect.com",
  "aboutCompanyImage": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
  "aboutCompanyTitle": "About theBoEffect LLC REST APIs",
  "aboutCompany": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis ultricies. Odio eu feugiat pretium nibh ipsum. Tristique nulla aliquet enim tortor at auctor urna nunc id. Urna nunc id cursus metus aliquam. Malesuada pellentesque elit eget gravida cum sociis. Gravida rutrum quisque non tellus.",
  "aboutButton": "Learn More",
  "allowRegister": true,
  "protocol": "http",
  "service": "localhost:3000",
  "siteImage": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png"
}
```
## Getting Started With the UI

* Register as a user from the login page
* Login
* Add Swagger spec references from the Admin page
* You may want to go back and set settings.allowRegister to false after this initial setup so that people can't register as admin users on their own. This will require a restart/redeploy

### Access

The api allows local admins to register by default (settings.allowRegister = true). You'll want to set that to false before deploying publicly once you've set up the desired admin accounts. In the future, an OIDC integration will make access possible at scale for an org.

## Cool Ideas for Later (Help is Welcome)

* OIDC Integration
* Mesh Integration

## UX Credits

* [now-ui-kit by creativetimoffical](https://github.com/creativetimofficial/now-ui-kit)
* [ReDoc](https://github.com/Redocly/redoc)
* [Formspree](https://formspree.io/)
* [OpenAPI](https://swagger.io/)

### follow me:
* [twitter](https://twitter.com/theboeffect)
* [linkedIn](https://www.linkedin.com/in/bmotlagh/)
* [instagram](https://www.instagram.com/theboeffect/)

