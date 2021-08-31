import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService extends CrudService<Products, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/products`);
  }

}



