import { Injectable, Signal, signal, Component, inject } from '@angular/core';
import { Task } from '../interfaces/Task.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URLBase: string = 'http://localhost:3000/tasks'
  // private httpClient : HttpClient = inject(HttpClient);

  private _tasksSubject = new BehaviorSubject<Task[]>([]);

  tasks$ = this._tasksSubject.asObservable();


  constructor(private httpClient: HttpClient){
    this.fetchTasks()
  }

  fetchTasks(): void{
    this.httpClient.get<Task[]>(this.URLBase)
    .subscribe({
      next: tasks => this._tasksSubject.next(tasks)
    })
  }

  getTasks(){
    return this._tasksSubject.asObservable();
  }

  
  addTask(title: string){
    const newTask: Omit<Task,'id'> = {
      title,
      priority: 'media',
      completed: false
    }
    return this.httpClient.post<Task>(this.URLBase, newTask)
    .subscribe({
      next:() => this.fetchTasks(),
      error : () => alert("ERROR AL INTRODUCIR LA TAREA")
    });
  }

  deleteTask(id:string){
    this.httpClient.delete(`${this.URLBase}/${id}`)
    .subscribe({
      next: () => this.fetchTasks()
    })
  }

  updateTask(id:string, statusCompletedTask:boolean){
    this.httpClient.patch(this.URLBase + "/" + id, JSON.stringify({completed:!statusCompletedTask}))
    .subscribe({
      next: () => this.fetchTasks(),
      error: (error) => alert("Se ha producido un error al actualizar la tarea")
    });
  }
}
