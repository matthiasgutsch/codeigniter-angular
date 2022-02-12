import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { ProductsVariations } from '../models/products_variations';

@Injectable({
  providedIn: 'root'
})

export class ProductsVariationsService extends CrudService<ProductsVariations, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/products_variations`);
  }

}



