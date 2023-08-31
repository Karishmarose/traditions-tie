import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { UserService } from '@core/services/user';
import { GlobalDataService } from '@core/services/common';
import { Subscription } from 'rxjs';
import { CreateGuestListDto, GuestDto } from '@models/common/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'guest-list-modal-component',
  templateUrl: './guest-list-modal.component.html',
  styleUrls: ['./guest-list-modal.component.scss'],
})
export class GuestListModalComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService, private globalDataModels: GlobalDataService,
    private formBuilder: FormBuilder
  ) { }

  @Input() eventId!: string;

  private subscriptions = new Subscription()
  guestList$ = this.globalDataModels.guestList$

  newTask: string = '';
  taskDeadline: string = '';
  checked: boolean = false;
  rsvpStatus = ['Pending', 'Accepted', 'Declined']

  guestForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    guest_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    mobile: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
    rsvp_status: ['', Validators.required]
  });

  tasks: GuestDto[] = [];

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d !== null && d >= today;
  };

  ngOnInit(): void {
    this.subscriptions.add(
      this.guestList$.subscribe(list => {
        this.clearTasks();
        this.tasks = [];

        list?.forEach(e => this.tasks.push(e))
      }))
  }


  addGuest() {
    const body: CreateGuestListDto = this.guestForm.getRawValue()
    body.event_id = this.eventId
    this.userService.createGuestOfEvent(body)
  }

  updateGuestList(task: GuestDto): void {
    this.userService.updateGuestListOfEvent(task, 'Pending')
  }

  clearTasks() {
    this.guestForm.reset()
  }

  toggleEdit(task: GuestDto): void {
    task.isEditing = !task.isEditing;
  }

  saveEditedStatus(task: GuestDto): void {
    this.userService.updateGuestListOfEvent(task,task.rsvp_status)
    task.isEditing = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.globalDataModels.guestList.next(undefined)
  }
}
