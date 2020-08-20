# Open API Aggregation and Dev Portal Generator

This project allows you to register openAPI specs that are hosted in other services. The application persists these and then makes them available in an aggregated portal as a Development Portal.

#### follow me:
* [twitter](https://twitter.com/theboeffect)
* [linkedIn](https://www.linkedin.com/in/bmotlagh/)
* [instagram](https://www.instagram.com/theboeffect/)

### oData Spec

https://www.odata.org/documentation/

### JSON Patch

http://jsonpatch.com/

### DB

If you'd rather use a different database or ODM, the following modifications are necessary:

* change connection.js to the appropriate DB
* validate that slsapp and start both correctly implement connection.js
* in each of your api/resources, change the dal.js file to access the new DB using the new ODM/ORM

## Site Settings

Since this is a single tenant solution (one instance per organization requiring a portal), settings such as the company name, logo, and html meta data are defined in a static json file at the root of the project (./settings.json). This file is generated when you run "yarn run settings" from ./settings-default.json'. The UI is a complete SPA unto itself under the portal directory and expects its own default copy of this file, which is also created when you run "yarn run settings". When you follow the build instructions below, those settings are carried over to the portal project, so you only ever need to update the root ./settings.json file. In this way, if the solution is ever broken into two repos, you can decouple these and maintain settings separately. These files are ignored by git so you can make your customizations easily.

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
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
      "title": "THIS IS INTERESTING",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
      "title": "TOKENS",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
  "allowRegister": true,
  "metaData": {
    "siteUrl": "http://localhost:3000",
    "siteName": "Developer Portal",
    "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png"
  }
}
```

## Local Build Instruction

* Clone the project
* Somewhere on your system run: docker run -p 27017:27017 mongo
* yarn
* yarn run settings
* Update ./settings.json with your site settings
* yarn test (optional)
* yarn run test-ui (optional)
* yarn run build-ui
* yarn run dev
* http://localhost:3000

### Getting Started

* Register as a user from the login page
* Login
* Add Swagger spec references from the Admin page
* You may want to go back and set settings.allowRegister to false after this initial setup so that people can't register as admin users on their own. This will require a restart/redeploy

### Access

The api allows local admins to register by default (settings.allowRegister = true). You'll want to set that to false before deploying publicly once you've set up the desired admin accounts. In the future, an OIDC integration will make access possible at scale for an org.


## UI

The UI its own embedded SPA project that simply builds to the parent public folder. This way it can easily be worked on separately or pulled out entirely. It is an angular 10 project under the /portal file. To develop or modify the UI do the following:

* Clone the project
* yarn
* yarn run settings
* cd portal/
* yarn test (optional)
* yarn start

From here all the normal angular commands would apply (i.e. ng). When you're ready you can do an "ng build" from this directory or go to the parent directory and do a "yarn build". This will trigger the appropriate angular static files to be added to the ./public folder of the main project where they will be served along with the service API at localhost:3000.

## TODO

* login error where password is cached
* need to refresh app on login
* Unit tests for specs
* Docker Compose - make local getting started easier...
* Deployment instructions for docker and lambda

## Credits

* [now-ui-kit by creativetimoffical](https://github.com/creativetimofficial/now-ui-kit)
* [ReDoc](https://github.com/Redocly/redoc)
* [Formspree](https://formspree.io/)



