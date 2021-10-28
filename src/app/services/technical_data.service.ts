import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Technical_data } from '../models/technical_data';

@Injectable({
  providedIn: 'root'
})

export class TechnicalDataService extends CrudService<Technical_data, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/technical_data`);
  }

}

