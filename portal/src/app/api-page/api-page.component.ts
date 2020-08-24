import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {environment} from "../../environments/environment";
import {SchemasService} from "../services/schemas.service";
import {ActivatedRoute} from "@angular/router";

declare let Redoc: any;

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApiPageComponent implements OnInit, AfterViewInit {
  public id:string;
  public spec:any;
  constructor(
    public SchService: SchemasService,
    private route: ActivatedRoute
  ) { }
  public settings:any = environment.setting;
  public env:any = environment;
  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    try {
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id === 'local') this.spec = `${this.env.protocol}://${this.env.service}/swagger.json`;
      else {
        const resp = await this.SchService.getApi(this.id).toPromise();
        if(resp.data && resp.data.apiSpecJsonUri) this.spec = resp.data.apiSpecJsonUri;
        else throw resp;
      }
      await Redoc.init(this.spec, {
        scrollYOffset: 50
      }, document.getElementById('redoc-container'), () => {
        const checkExist = setInterval(() => {
          const elements = document.querySelectorAll<HTMLElement>('div.menu-content');
          if (elements.length > 0) {
            console.info('fixing redoc...');
            elements[0].setAttribute("class", `${elements[0].classList.value} fix-redoc`);
            clearInterval(checkExist);
          }
        }, 100);
      });
    } catch (error) {
      console.error(error);
    }

  }
}
