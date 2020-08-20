import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {
  httpOptions;
  constructor(private http: HttpClient) {
    console.log('Schema Service Enabled');
  }
  public env:any = environment;
  public apiUrl = `${this.env.service}/api`;
  setAuthHeader(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  removeAuthHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({})
    };
  }

  getApis():Observable<any> {
    return this.http.get(`${this.apiUrl}/schema`, this.httpOptions);
  }

  getApi(id):Observable<any> {
    return this.http.get(`${this.apiUrl}/schema/${id}`, this.httpOptions);
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
