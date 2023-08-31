import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PARENT
import { PagesComponent } from './pages.component';
// PAGES
import { HomeComponent as HomePage } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { AddEventComponent } from './add-event/event.component';
import { EvenetDetailsComponent } from './event-details/event-details.component';
const routes: Routes = [
  {
    path: '',

    component: PagesComponent,
    children: [
      { path: 'home',  component: HomePage },
      { path: 'about-us',  component: AboutUsComponent },
      { path: 'profile',  component: ProfileComponent },
      { path: 'add-event',  component: AddEventComponent },
      { path: 'event-details',  component: EvenetDetailsComponent },

      {path:'',pathMatch:'full',redirectTo:'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
