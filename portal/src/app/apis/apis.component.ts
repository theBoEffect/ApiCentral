import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {SchemasService} from "../services/schemas.service";

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})

export class ApisComponent implements OnInit {
  public apis: any;
  constructor(
    public SchService: SchemasService
  ) {
  }
  public settings:any = environment.setting;
  public env:any = environment;
  async refresh(){
    try {
      const resp = await this.SchService.getApis().toPromise();
      this.apis = resp.data;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

}
