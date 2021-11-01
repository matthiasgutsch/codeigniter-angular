import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Billings } from '../models/billings';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})

export class OrdersService extends CrudService<Orders, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/orders`);
  }




  

  




}




