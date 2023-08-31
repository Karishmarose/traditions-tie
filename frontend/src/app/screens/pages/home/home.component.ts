import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@core/services/user';
import { GlobalDataService } from '@core/services/common';
import { CreateRazorPayVerifyDto, ProfileDto, RazorpayOrder } from '@models/common/user.model';
import { Subscription, } from 'rxjs';
import { tap } from 'rxjs/operators'
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { environment } from '@environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private globalDataModels: GlobalDataService,
    private userService: UserService, private dialog: MatDialog) { }

  private subscriptions = new Subscription()

  currentUser$ = this.globalDataModels.currentUser$;
  isPaymentSuccess$ = this.globalDataModels.ispaymentSuccess$

  ngOnInit(): void {
    this.subscriptions.add(
      this.isPaymentSuccess$.subscribe(e => {
        if (e) {
          this.openModal()

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
    )
  }
  async payNow(currentUser: ProfileDto) {
    const paymentOrderDetails: RazorpayOrder | null = await this.userService.createOrderIdForPayment();

    if (paymentOrderDetails) {
      const razorPayOptions = {
        description: 'Sample Razorpay demo',
        currency: paymentOrderDetails.currency,
        amount: paymentOrderDetails.amount_due,
        order_id: paymentOrderDetails.id,
        name: currentUser.user_name,
        key: environment.RAZORPAY_KEY_ID,
        image: 'https://i1.sndcdn.com/avatars-000420958836-gwdqtc-t500x500.jpg',
        prefill: {
          name: currentUser.user_name,
          email: currentUser.email_id,
          phone: currentUser.mobile_number
        },
        theme: {
          color: '#903c7af2'
        },
        modal: {
          ondismiss: () => {
            console.log('dismissed');
          }
        },
        handler: (response: any) => {
          if (response.razorpay_payment_id) {
            // Handle successful payment here
            const body: CreateRazorPayVerifyDto = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
            this.userService.checkPaymentVerify(body)
          } else {
            console.log('Payment failed');
            // Handle payment failure here
          }
        }
      };

      Razorpay.open(razorPayOptions);
    } else {
      console.log('Payment order details not available.');
    }
  }


  openModal(): void {
    this.dialog.open(PaymentModalComponent, {
      width: '400px',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
