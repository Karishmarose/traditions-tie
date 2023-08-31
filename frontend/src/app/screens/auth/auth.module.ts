import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// SHARED MODULE
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
// AUTH LAYOUT
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// AUTH PAGES
@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule { }
