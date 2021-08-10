import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})

export class TypeService extends CrudService<Type, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/type`);
  }

}

