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

## Instruction

* Clone the project
* yarn
* yarn test
* yarn run build-ui
* yarn run dev
* http://localhost:3000
* Go to http://localhost:3000/api for API documentation

## Site MetaData

To set html metadata for robots, social media, etc., you must set the values before deployment at ./metaData.json

```
{
  "title": "Home - Developer Portal",
  "url": "http://localhost:3000",
  "site_name": "Developer Portal",
  "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png"
}
```

## TODO

* UI
* Unit tests for settings
* Unit tests for specs

## Credits

* [now-ui-kit by creativetimoffical](https://github.com/creativetimofficial/now-ui-kit)


