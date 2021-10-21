import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})

export class SkillsService extends CrudService<Skills, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/skills`);
  }

}



