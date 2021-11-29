import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Projects } from '../models/projects';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService extends CrudService<Projects, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/projects`);
  }

}



