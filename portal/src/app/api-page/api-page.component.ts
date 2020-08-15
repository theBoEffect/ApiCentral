import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {environment} from "../../environments/environment";

declare let Redoc: any;

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApiPageComponent implements OnInit, AfterViewInit {

  constructor() { }
  public settings:any = environment.setting;
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Redoc.init('https://postcard.mailmyvoice.com/swagger.json', {
      scrollYOffset: 50
    }, document.getElementById('redoc-container'))
  }
}
