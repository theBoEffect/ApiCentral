import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";

declare let Redoc: any;

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})

export class ApisComponent implements OnInit {

  constructor(
  ) {

  }
  public settings:any = environment.setting;

  ngOnInit(): void {
  }

}
