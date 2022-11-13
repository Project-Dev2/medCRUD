import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RadiologyComponent } from './radiology/radiology.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'radiology/:id', component:RadiologyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
