import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PARENT COMPONENT
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// CHILD COMPONENTS

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // SET DEFAULT LOGIN PAGE
      // LOGIN AND REGISTER PAGES
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: '/error' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
