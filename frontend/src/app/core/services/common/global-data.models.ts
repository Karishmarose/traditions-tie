import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject } from 'rxjs';
// MODELS
import { PROFILE } from '@models/auth';
import { CheckListDto, CoordinatorDto, EventDto, GuestDto, NewCreatedEventCreatedRecommendationsDto, RazorpayOrder, ThemeDto, VendorDto, VendorTypesDto } from '@models/common/user.model';
@Injectable({
  providedIn: 'root',
})
export class GlobalDataModelService {
  currentUser = new BehaviorSubject<PROFILE | undefined>(undefined);
  currentUser$ = this.currentUser.asObservable()

  coordinatorList = new BehaviorSubject<CoordinatorDto[] | undefined>(undefined);
  coordinatorList$ = this.coordinatorList.asObservable()

  themeList = new BehaviorSubject<ThemeDto[] | undefined>(undefined);
  themeList$ = this.themeList.asObservable()

  vendorTypes = new BehaviorSubject<VendorTypesDto[] | undefined>(undefined);
  vendorTypes$ = this.vendorTypes.asObservable()


  events = new BehaviorSubject<EventDto[] | undefined>(undefined);
  events$ = this.events.asObservable()

  ispaymentSuccess = new BehaviorSubject<boolean | undefined>(undefined);
  ispaymentSuccess$ = this.ispaymentSuccess.asObservable()

  checkList = new BehaviorSubject<CheckListDto[] | undefined>(undefined);
  checkList$ = this.checkList.asObservable()

  guestList = new BehaviorSubject<GuestDto[] | undefined>(undefined);
  guestList$ = this.guestList.asObservable()

  newEventCreated = new BehaviorSubject<NewCreatedEventCreatedRecommendationsDto | undefined>(undefined);
  newEventCreated$ = this.newEventCreated.asObservable()
  constructor() { }
}
