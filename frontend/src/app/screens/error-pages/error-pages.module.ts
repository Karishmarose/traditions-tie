import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
// WRAPPER
import { ErrorPagesComponent } from './error-pages.component';
// PAGES

@NgModule({
  declarations: [ErrorPagesComponent],
  imports: [CommonModule, ErrorPagesRoutingModule],
})
export class ErrorPagesModule {}
