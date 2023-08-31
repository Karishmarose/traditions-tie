import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@core/services/user';
import { GlobalDataService } from '@core/services/common';
import { Subscription } from 'rxjs';
import { CheckListModalComponent } from '../checklist-modal/checklist-modal.component';
import { GuestListModalComponent } from '../guest-list-modal/guest-list-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EvenetDetailsComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog,
    private userService: UserService, private globalDataModels: GlobalDataService,
  ) { }

  private subscriptions = new Subscription()

  events$ = this.globalDataModels.events$

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d !== null && d >= today;
  };

  expandedStates: boolean[] = [];

  toggleExpansion(index: any): void {
    this.expandedStates[index] = !this.expandedStates[index];
  }

  ngOnInit(): void {
    this.userService.getUserEvents()

    this.subscriptions.add(this.events$.subscribe(events => {
      this.expandedStates = new Array(events?.length).fill(false);

    }))
  }

  viewCheckList(id: string): void {
    this.userService.getAllCheckListOfEvent(id)
    const dialogRef = this.dialog.open(CheckListModalComponent, {
      width: '700px',
    });

    dialogRef.componentInstance.eventId = id;
  }

  viewGuestList(id: string): void {
    this.userService.getAllGuestListOfEvent(id)
    const dialogRef = this.dialog.open(GuestListModalComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.eventId = id;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.globalDataModels.events.next(undefined);
  }
}
