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
  public contactForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
