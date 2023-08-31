import { Component, } from '@angular/core';
import { GlobalDataService } from '@core/services/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'recommendation-modal-component',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.scss'],
})
export class RecommendationModalComponent {

  constructor(
     private globalDataModels: GlobalDataService,
     private dialogRef: MatDialogRef<RecommendationModalComponent>,
     private router: Router,

  ) { }

  recommendation$ = this.globalDataModels.newEventCreated$

  closeDialog():void{
    this.dialogRef.close();
    this.router.navigate(['event-details'])
  }
}
