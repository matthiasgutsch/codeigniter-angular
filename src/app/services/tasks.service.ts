import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Projects } from '../models/projects';
import { Task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService extends CrudService<Task, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/tasks`);
  }

}



