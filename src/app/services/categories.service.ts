import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends CrudService<Category, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/category`);
  }

}



