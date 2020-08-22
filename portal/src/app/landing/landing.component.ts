import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public settings:any = environment.setting;
  public aboutUrl:any = this.settings.aboutCompanyUrl;
  public aboutInternal:boolean = false;
  public contactForm: FormGroup;
  constructor() {
    if(!this.aboutUrl.includes('http')) this.aboutInternal = true;
  }

  ngOnInit(): void {
  }

}
