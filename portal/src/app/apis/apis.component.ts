import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit {

  constructor() { }
  public settings:any = environment.setting;
  ngOnInit(): void {
  }

}
