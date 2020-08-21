import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public env:any = environment;
  public apiP = this.env.protocol;
  public apiUrl = `${this.env.service}/api`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const url = `${this.apiP}://${this.apiUrl}/users/me`;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `basic ${window.btoa(email + ':' + password)}`
      })
    };

    return this.http.get<any>(url, this.httpOptions)
      .pipe(map((result:any) => {
        const user = JSON.parse(JSON.stringify(result.data));
        user.authdata = window.btoa(email + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
