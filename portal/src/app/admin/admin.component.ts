import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {SchemasService} from "../providers/schemas.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public apis: any;
  private closeResult: string;
  constructor(
    public SchService: SchemasService,
    private modalService: NgbModal
  ) { }
  public settings:any = environment.setting;
  async refresh(){
    try {
      const resp = await this.SchService.getApis().toPromise();
      this.apis = resp.data;
    } catch (error) {
      console.error(error);
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.refresh();
  }

}
