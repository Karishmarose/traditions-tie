import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';
// PAGES
const routes: Routes = [
  { path: '', redirectTo: '404', pathMatch: 'full' },
  {
    path: '401',
    component: ErrorPagesComponent
  },
  {
    path: '404',
    component: ErrorPagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule { }
