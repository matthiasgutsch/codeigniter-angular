import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Products } from '../models/products';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WordpressService extends CrudService<Products, number> {
  nonce: string = ''
  currentTimestamp: number = 0 
  customer_key: string = 'ck_9d30eb6f94d274a938e5c2da9a1a9c2d9f6b460e'; 
  customer_secret: string = 'cs_eb7bb049b6a36f6e68afd732c71559cb3aaa1acf';  


  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/products`);

    
  }

  

  getPosts(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'customer_secret': 'cs_eb7bb049b6a36f6e68afd732c71559cb3aaa1acf',
        'customer_key': 'ck_9d30eb6f94d274a938e5c2da9a1a9c2d9f6b460e',

        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this._http.get<any[]>('https://shop.migustafood.it/wp-json/wc/v3/products', httpOptions);
  }

  findWordpress(id: number) {
    return this._http.get('http://localhost:3000/posts/' + id)
  }

  getList() {
    return this._http.get('http://localhost:3000/posts/')
  }


  
}



