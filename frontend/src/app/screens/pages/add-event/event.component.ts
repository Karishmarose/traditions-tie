import { Component, OnDestroy, OnInit, } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user';
import { GlobalDataService } from '@core/services/common';
import { FormValidationService } from '@core/services/form';
import { EventCreateDto, VendorDto } from '@models/common/user.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecommendationModalComponent } from '../recommendation-modal/recommendation-modal.component';
import { ReviewsModalComponent } from '../reviews-modal/reviwes-modal.component';

@Component({
  selector: 'add-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class AddEventComponent implements OnInit, OnDestroy {
  constructor(private formBuilder: FormBuilder, private formValidationService: FormValidationService,
    private userService: UserService, private globalDataModels: GlobalDataService,
    private router: Router,
    private dialog: MatDialog,
  ) { }
  private subscriptions = new Subscription()
  coordinatorList$ = this.globalDataModels.coordinatorList$
  themeList$ = this.globalDataModels.themeList$
  vendorTypes$ = this.globalDataModels.vendorTypes$
  newEventCreated$ = this.globalDataModels.newEventCreated$

  isEventTypeWedding:boolean=false
  themePage = false;
  submitPage = false;
  vendorDetails: { vendor_type: string, vendor_id: string }[] = [];
  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d !== null && d >= today;
  };

  eventForm: FormGroup = this.formBuilder.group({
    eventType: ['', Validators.required],
    eventDate: ['', Validators.required],
    eventLocation: ['', Validators.required],
    guestCount: ['', Validators.required],
    eventCoordinator: ['', Validators.required],
    wedding: this.formBuilder.array([
      this.formBuilder.group({
        first_name: [''],
        last_name: [''],
        email_id: [''],
        mobile: [''],
        nationality: [''],
        cultural_orgin: [''],
        relegion: [''],
        langauge: ['']
      }),
      this.formBuilder.group({
        first_name: [''],
        last_name: [''],
        email_id: [''],
        mobile: [''],
        nationality: [''],
        cultural_orgin: [''],
        relegion: [''],
        langauge: ['']

      })
    ]),
    theme: ['',],
    vendors: ['',]
  });

  events: string[] = ['Birthday', 'Wedding', 'Farewell', 'Graduation']

  ngOnInit(): void {
    this.userService.getAllCoordinators();
    this.userService.getAllThemes()
    this.userService.getAllVendors()

    this.eventForm.controls['eventType'].valueChanges.subscribe(eventType => {
      const weddingFields = this.eventForm.get('wedding') as FormArray;

      weddingFields.controls.forEach((control: AbstractControl) => { // Change the parameter type here
        if (control instanceof FormGroup) {
          for (const controlName in control.controls) {
            if (eventType === 'Wedding') {
              control.get(controlName)?.setValidators([Validators.required]);
            } else {
              control.get(controlName)?.clearValidators();
            }
            control.get(controlName)?.updateValueAndValidity();
          }
        }
      });
    });

    //adding multiple vendors for add event
    this.subscriptions.add(this.eventForm.controls['vendors'].valueChanges.subscribe((vendor: VendorDto) => {
      this.vendorDetails.push({ vendor_id: vendor._id, vendor_type: vendor.vendor_type })
    }))

    this.subscriptions.add(
      this.newEventCreated$.subscribe(data => {
        if (data?.created) {
          const eventType = this.eventForm.controls['eventType'].value
          if (eventType==='Wedding') {
            this.viewRecommendationModal()
          } else {
           this.router.navigate(['event-details'])
          }
        }
      })
    )
  }

  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.eventForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.eventForm
    );
  }


  goToAddEventPage(): void {
    this.themePage = false
    this.submitPage = false
  }


  goToThemePage(): void {
    this.themePage = true;
    this.submitPage = false
  }

  gotToSubmitPage(): void {
    this.themePage = false;
    this.submitPage = true
  }

  onSubmit(): void {
    const formData = this.eventForm.getRawValue();

    const body: EventCreateDto = {
      coordinator_id: formData?.eventCoordinator?._id,
      theme_id: formData?.theme?._id,
      location: formData?.eventLocation,
      event_date: formData?.eventDate,
      event_type: formData?.eventType,
      guest_count: formData?.guestCount,
      bride_first_name: formData?.wedding?.[0]?.first_name,
      bride_last_name: formData?.wedding?.[0]?.last_name,
      bride_email: formData?.wedding?.[0]?.email_id,
      bride_mobile: formData?.wedding?.[0]?.mobile,
      bride_nationality: formData?.wedding?.[0]?.nationality,
      bride_cultural_origin: formData?.wedding?.[0]?.cultural_orgin,
      bride_religion: formData?.wedding?.[0]?.relegion,
      bride_preferred_language: formData?.wedding?.[0]?.langauge,
      groom_first_name: formData?.wedding?.[1]?.first_name,
      groom_last_name: formData?.wedding?.[1]?.last_name,
      groom_email: formData?.wedding?.[1]?.email_id,
      groom_mobile: formData?.wedding?.[1]?.mobile,
      groom_nationality: formData?.wedding?.[1]?.nationality,
      groom_cultural_origin: formData?.wedding?.[1]?.cultural_orgin,
      groom_religion: formData?.wedding?.[1]?.relegion,
      groom_preferred_language: formData?.wedding?.[1]?.langauge,
      vendors: this.vendorDetails
    };
    this.userService.createUserEvent(body)
  }

  viewRecommendationModal(): void {
    this.dialog.open(RecommendationModalComponent, {
      width: '1000px',
      disableClose: true,
    });
  }

  viewReviewsModal(reviews?:string[]): void {
    const dialogRef = this.dialog.open(ReviewsModalComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.reviews = reviews;

  }
  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.globalDataModels.newEventCreated.next(undefined)
  }
}
