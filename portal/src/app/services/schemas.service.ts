import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { Observable, of } from 'rxjs';
import {User} from "../models/user";
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {
  httpOptions;
  private user: User;
  constructor(
    private http: HttpClient,
    private access: LoginService
  ) {
    console.log('Schema Service Enabled');
    this.user = this.access.currentUserValue;
    if(this.user && this.user.authdata) this.setAuthHeader();
  }
  public env:any = environment;
  public apiUrl = `${this.env.protocol}://${this.env.service}/api`;

  setAuthHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.user.authdata}`
      })
    };
  }

  removeAuthHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({})
    };
  }

  getApis():Observable<any> {
    return this.http.get(`${this.apiUrl}/schema`);
  }

  getApi(id):Observable<any> {
    return this.http.get(`${this.apiUrl}/schema/${id}`);
  }

  addApi(data):Observable<any> {
    return this.http.post(`${this.apiUrl}/schema`, data, this.httpOptions);
  }

  updateApi(id, data):Observable<any> {
    return this.http.patch(`${this.apiUrl}/schema/${id}`, data, this.httpOptions);
  }

  deleteApi(id):Observable<any> {
    return this.http.delete(`${this.apiUrl}/schema/${id}`, this.httpOptions);
  }
}
