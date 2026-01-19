import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../interfaces/Task.interface';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  @Input() task !: Task;
  @Output() change = new EventEmitter<void>();
  private taskService : TaskService = inject(TaskService);

  onDelete(){
    // this.deleteClick.emit(this.task.id);
  //  this .taskService.deleteTask(this.task.id);
  //  this.change.emit();
    // this.deleteClick.emit();
    this.taskService.deleteTask(this.task.id);
    // .subscribe({
    //   next: () => this.change.emit()
    // })
  }

  onComplete() {
    // this.taskService.changeStatus(this.task.id);
    // this.change.emit();
    this.taskService.updateTask(this.task.id, this.task.completed);
  }
}
