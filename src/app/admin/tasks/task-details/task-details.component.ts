import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/tasks';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  @Input() tasks: Task[];
  @Input() borderColor: String;
  @Output() deleteItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();

  deleteTask(id, title, type, index) {
    this.deleteItem.emit({id, title, type, index});
  }

  editTask(task) {
    this.editItem.emit(task);
  }
}
