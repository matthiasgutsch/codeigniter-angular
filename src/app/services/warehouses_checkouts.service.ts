import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { WarehouseCheckouts } from '../models/warehouse_checkouts';

@Injectable({
  providedIn: 'root'
})

export class WarehousesCheckoutsService extends CrudService<WarehouseCheckouts, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/warehouses_checkouts`);
  }

}



