import { Component, Input, } from '@angular/core';
import { GlobalDataService } from '@core/services/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'reviews-modal-component',
  templateUrl: './reviews-modal.component.html',
  styleUrls: ['./reviews-modal.component.scss'],
})
export class ReviewsModalComponent {

  constructor(
    private globalDataModels: GlobalDataService,
    private dialogRef: MatDialogRef<ReviewsModalComponent>,
    private router: Router,

  ) { }
@Input() reviews?:string[];

  closeDialog(): void {
    this.dialogRef.close();
  }
}
