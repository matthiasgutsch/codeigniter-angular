import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Category } from '../models/category';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})

export class BrandService extends CrudService<Brand, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/brand`);
  }

}



