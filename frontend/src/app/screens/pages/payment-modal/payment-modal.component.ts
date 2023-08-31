import { ChangeDetectorRef, Component, OnInit, Renderer2, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'payment-modal-component',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PaymentModalComponent>,
     private renderer: Renderer2,
     private changeDetectorRef:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges()
    this.renderer.listen('document', 'visibilitychange', () => {
      if (!document.hidden) {
        this.dialogRef.close();
      }
    });

    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }
}
