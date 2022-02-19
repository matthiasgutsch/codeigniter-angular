import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Purchase_orders } from '../models/purchase_orders';

@Injectable({
  providedIn: 'root'
})

export class PurchaseOrdersService extends CrudService<Purchase_orders, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/purchase_orders`);
  }




  

  




}




