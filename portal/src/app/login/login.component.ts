import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { LoginService } from '../services/login.service'
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  message = '';
  public settings:any = environment.setting;
  public reg:boolean = this.settings.allowRegister;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private app: AppComponent
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async register() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    try {
      this.loading = true;
      await this.authenticationService.register(this.f.email.value, this.f.password.value).toPromise();
      this.message = 'You are registered! Now please login using the same credentials.';
      this.loading = false;
    } catch (error) {
      this.error = (error.message) ? error.message : JSON.stringify(error);
      this.loading = false;
    }
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    try {
      this.loading = true;
      await this.authenticationService.login(this.f.email.value, this.f.password.value).toPromise();
      this.app.reset();
      this.router.navigate([this.returnUrl]);
    } catch (error) {
      if(error.status === 401) this.error = 'Wrong email address or password';
      else this.error = (error.message) ? error.message : JSON.stringify(error);
      this.loading = false;
    }
  }
}
