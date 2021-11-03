import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Supports } from '../models/supports';

@Injectable({
  providedIn: 'root'
})

export class SupportsService extends CrudService<Supports, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/supports`);
  }

}



