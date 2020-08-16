import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApisComponent } from './apis/apis.component';
import { ApiPageComponent } from "./api-page/api-page.component";
import { AdminComponent} from "./admin/admin.component";
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'apis', component: ApisComponent },
  { path: 'apis/:id', component: ApiPageComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
