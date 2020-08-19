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
      swaggerUiUrl: [''],
      displayTitle: ['',  Validators.required],
      displayDescription: ['', Validators.required],
    });
  }
  public settings:any = environment.setting;
  async refresh(){
    try {
      const resp = await this.SchService.getApis().toPromise();
      this.apis = resp.data;
      console.info(this.apis)
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
        console.info('UPDATING');
        return this.updateApi();
      }
      console.info( `WE HAVE ${result}`);
      return this.saveNew();
    } catch (error) {
      console.info( `error ${error}`)
    }
  }

  async updateApi() {
    console.info('this worked update');
    console.info(this.addForm.getRawValue());
    //todo call service and update api record
    this.addForm.reset();

  }

  async saveNew() {
    console.info('this worked new');
    console.info(this.addForm.getRawValue());
    //todo call service and make api record
    this.addForm.reset();
  }

  async delete(id) {
    try {
      console.info(`DELETE ${id}`);
    } catch (error) {
      //show
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

}
