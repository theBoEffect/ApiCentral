import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApisComponent } from './apis/apis.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'apis', component: ApisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
