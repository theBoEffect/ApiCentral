import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public settings:any = environment.setting;
  public title:string = environment.setting.title;
  public year:string = (new Date()).getFullYear().toString();
  constructor(

  ) {

    console.info(environment.setting);

  }
}

/*
{
  "company": "theBoEffect LLC",
  "title": "theBoEffect Developer Portal",
  "statement": "Lets Build Something", //todo delete
  "logoUrl": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
  "bannerTitle": "API Central",
  "bannerStatement": "A place for developers to find what they need.",
  "bannerImage": "",
  "infoBlocks": [
  {
    "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png",
    "title": "EXAMPLE",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
],
  "metaData": {
  "siteUrl": "http://localhost:3000",
    "siteName": "Developer Portal",
    "image": "https://cdn-images-1.medium.com/max/280/1*vuHoiLlmWjuTJ9zK98jFtQ@2x.png"
}
}
*/
