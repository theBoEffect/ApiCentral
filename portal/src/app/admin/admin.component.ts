import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {SchemasService} from "../providers/schemas.service";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public apis: any;
  public addForm: FormGroup;
  constructor(
    public SchService: SchemasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.addForm = this.formBuilder.group({
      apiSpecJsonUri: ['', Validators.required],
      swaggerUiUrl: [undefined],
      displayTitle: ['',  Validators.required],
      displayDescription: ['', Validators.required],
    });
  }
  public settings:any = environment.setting;
  async refresh(){
    try {
      const resp = await this.SchService.getApis().toPromise();
      this.apis = resp.data;
    } catch (error) {
      console.error(error);
    }
  }

  async open(content, api:any = undefined) {
    try {
      let edit = false;
      this.addForm.reset();
      if(api !== undefined) {
        edit = true;
        this.addForm.patchValue({apiSpecJsonUri : api.apiSpecJsonUri });
        this.addForm.patchValue({swaggerUiUrl: api.swaggerUiUrl });
        this.addForm.patchValue({displayTitle: api.displayTitle });
        this.addForm.patchValue({displayDescription: api.displayDescription });
      }
      const result = await this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
      if (edit) {
        return this.updateApi(api);
      }
      return this.saveNew();
    } catch (error) {
      //todo show error
      console.info( `error ${error}`)
    }
  }

  async updateApi(api) {
    const data = [];
    const patch = this.addForm.getRawValue();
    for (let x in patch) {
      await new Promise((next) => {
        if(patch[x] === '' || patch[x] === undefined) {
          data.push({
            op: 'remove',
            path: `/${x}`
          });
          next();
        } else {
          if (!api[x]) {
            data.push({
              op: 'add',
              path: `/${x}`,
              value: patch[x]
            });
            next();
          }else {
            data.push({
              op: 'replace',
              path: `/${x}`,
              value: patch[x]
            });
            next();
          }
        }
      })
    }
    const result = await this.SchService.updateApi(api.id, data).toPromise();
    console.info(result.data);
    this.refresh();
    this.addForm.reset();
  }

  async saveNew() {
    try {
      const data = JSON.parse(JSON.stringify(this.addForm.getRawValue()));
      if(!data.swaggerUiUrl) delete data.swaggerUiUrl;
      const result = await this.SchService.addApi(data).toPromise();
      console.info(result.data);
      this.refresh();
      this.addForm.reset();
    } catch (error) {
      // todo error message
      console.error(error);
    }
  }

  async delete(id) {
    try {
      const result = await this.SchService.deleteApi(id).toPromise();
      console.info(result.data);
      this.refresh();
      this.addForm.reset();
    } catch (error) {
      //show
      console.error(error);
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

}
