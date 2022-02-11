import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { WarehouseCheckins } from '../models/warehouse_checkins';

@Injectable({
  providedIn: 'root'
})

export class WarehousesCheckinsService extends CrudService<WarehouseCheckins, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/warehouses_checkins`);
  }

}



