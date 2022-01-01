import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Timesheets } from '../models/timesheets';

@Injectable({
  providedIn: 'root'
})

export class TimesheetsService extends CrudService<Timesheets, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/timesheets`);
  }

}



