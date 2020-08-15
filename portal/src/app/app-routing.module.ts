import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApisComponent } from './apis/apis.component';
import { ApiPageComponent } from "./api-page/api-page.component";
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'apis', component: ApisComponent },
  { path: 'api', component: ApiPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
