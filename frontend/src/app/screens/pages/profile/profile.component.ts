import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth';
import { GlobalDataService } from '@core/services/common';
import { FormValidationService } from '@core/services/form';
import { PROFILE } from '@models/auth';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private globalDataService: GlobalDataService, private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private authService: AuthService
  ) { }

  private subscriptions = new Subscription()
  currentUser$: Observable<PROFILE | undefined> = this.globalDataService.currentUser$
  profileForm: FormGroup = this.formBuilder.group({
    email_id: [{ value: '', disabled: true },],
    first_name: ['',],
    last_name: ['',],
    mobile_number: ['', [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$')
    ]],
    address_line1: ['',],
    city: [''],
    street: ['',],
    zipcode: ['',]
  });
  ngOnInit(): void {
    this.subscriptions.add(
      this.currentUser$.subscribe(user => {
        const valuesToPatch = {
          first_name: user?.first_name,
          last_name: user?.last_name,
          email_id: user?.email_id,
          mobile_number: user?.mobile_number,
          address_line1: user?.address_line1,
          city: user?.city,
          zipcode: user?.zipcode,
          street: user?.street
        };
        this.profileForm.patchValue(valuesToPatch);
      })
    )
  }

  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.profileForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.profileForm
    );
  }

  onFormSubmit(): void {
    const formData  = this.profileForm.getRawValue()
    console.log(formData)
    this.authService.updateUserProfile(formData)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
