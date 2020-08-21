import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import {Title} from "@angular/platform-browser";
import {LoginService} from "./services/login.service";
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public settings:any = environment.setting;
  public title:string = environment.setting.title;
  public year:string = (new Date()).getFullYear().toString();
  private user: User;
  public loggedIn: boolean = false;
  constructor(
    private titleService: Title,
    private access: LoginService
  ) {
    this.titleService.setTitle(this.title);
    this.reset();
  }

  public reset(){
    this.user = this.access.currentUserValue;
    this.loggedIn = !!this.user;
  }
}
