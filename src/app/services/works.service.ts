import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Works } from '../models/works';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllList() {
    return this.http.get<Works>(this.serverUrl + 'works').pipe(
      catchError(this.handleError)
    );
  }

  getId(id: number) {
    return this.http.get<Works>(this.serverUrl + 'works/id/' + id).pipe(
      catchError(this.handleError)
    );
  }

  find(id: number) {
    return this.http.get<Works>(this.serverUrl + 'works/' + id).pipe(
      catchError(this.handleError)
    );
  }

  create(category) {
    return this.http.post<any>(this.serverUrl + 'works/create', category).pipe(
      catchError(this.handleError)
    );
  }

  update(category, id: number) {
    return this.http.post<any>(this.serverUrl + 'works/update/' + id, category).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    return this.http.delete(this.serverUrl + 'works/delete/' + id).pipe(
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
