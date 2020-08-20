import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import {Title} from "@angular/platform-browser";

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
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }
}
