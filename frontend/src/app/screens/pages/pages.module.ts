import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// EXTRA MATERIAL MODULES
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
// SHARED MODULE
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
// COMPONENTS
import { PagesComponent } from './pages.component';
import { Navbar } from '@shared/components';
//PAGES
import { HomeComponent as HomePage } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { AddEventComponent } from './add-event/event.component';
import { EvenetDetailsComponent } from './event-details/event-details.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { CheckListModalComponent } from './checklist-modal/checklist-modal.component';
import { GuestListModalComponent } from './guest-list-modal/guest-list-modal.component';
import { RecommendationModalComponent } from './recommendation-modal/recommendation-modal.component';
import { ReviewsModalComponent } from './reviews-modal/reviwes-modal.component';

@NgModule({
  declarations: [
    PagesComponent,
    Navbar,
    HomePage,
    AboutUsComponent,
    ProfileComponent,
    AddEventComponent,
    EvenetDetailsComponent,
    PaymentModalComponent,
    CheckListModalComponent,
    GuestListModalComponent,
    RecommendationModalComponent,
    ReviewsModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    PagesRoutingModule,
  ],
})
export class PagesModule { }
