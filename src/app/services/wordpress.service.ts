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

export class WordpressService extends CrudService<Products, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/products`);
  }

  findWordpress(id: number) {
    return this._http.get('http://localhost:3000/posts/' + id)
  }

  getList() {
    return this._http.get('http://localhost:3000/posts/')
  }
}



