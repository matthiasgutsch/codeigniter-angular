import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Category } from '../models/category';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.serverUrl + 'category/adminCategories').pipe(
      catchError(this.handleError)
    );
  }

  getCategory(id: number) {
    return this.http.get<Category>(this.serverUrl + 'category/adminCategory/' + id).pipe(
      catchError(this.handleError)
    );
  }

  find(id: number) {
    return this.http.get<Category>(this.serverUrl + 'category/adminCategory/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(category) {
    return this.http.post<any>(this.serverUrl + 'category/createCategory', category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(category, id: number) {
    return this.http.post<any>(this.serverUrl + 'category/updateCategory/' + id, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(this.serverUrl + 'category/deleteCategory/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
