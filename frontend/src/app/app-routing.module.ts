import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ROUTER GUARDS
import { LoginGuard } from '@core/guards';
const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./screens/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./screens/error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
  {
    path: '',
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
    canActivateChild:[LoginGuard],
    loadChildren: () =>
      import('./screens/pages/pages.module').then((m) => m.PagesModule),
  },

  // WRONG URL REDIRECT TO 404
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
