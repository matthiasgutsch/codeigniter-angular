import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Personal_data } from '../models/personal_data';

@Injectable({
  providedIn: 'root'
})

export class PersonalDataService extends CrudService<Personal_data, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/personal_data`);
  }

}

