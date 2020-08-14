import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public settings:any = environment.setting;
  public title:string = environment.setting.title;
  public year:string = (new Date()).getFullYear().toString();
  constructor() { }

  ngOnInit(): void {
  }

}
