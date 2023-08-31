import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { UserService } from '@core/services/user';
import { GlobalDataService } from '@core/services/common';
import { Subscription } from 'rxjs';
import { CheckListDto, CreateCheckListDto } from '@models/common/user.model';

@Component({
  selector: 'checklist-modal-component',
  templateUrl: './checklist-modal.component.html',
  styleUrls: ['./checklist-modal.component.scss'],
})
export class CheckListModalComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService, private globalDataModels: GlobalDataService,
  ) { }

  @Input() eventId!: string;

  private subscriptions = new Subscription()
  checkLists$ = this.globalDataModels.checkList$

  newTask: string = '';
  taskDeadline: string = '';
  checked: boolean = false

  tasks: CheckListDto[] = [];

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d !== null && d >= today;
  };

  ngOnInit(): void {
    this.subscriptions.add(
      this.checkLists$.subscribe(list => {
        this.clearTasks();
        this.tasks = [];

        list?.forEach(e => this.tasks.push(e))
      }))
  }


  addTask() {
    const body: CreateCheckListDto = {
      event_id: this.eventId,
      task_description: this.newTask,
      task_deadline: this.taskDeadline,
      task_status: 'todo'
    }
    this.userService.createCheckListOfEvent(body)
  }

  updateCheckList(task: CheckListDto): void {
    this.userService.updateCheckListOfEvent(task)
  }

  clearTasks() {
    this.newTask = '';
    this.taskDeadline = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.globalDataModels.checkList.next(undefined)
  }
}
