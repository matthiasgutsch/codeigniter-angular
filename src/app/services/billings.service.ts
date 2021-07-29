import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllList() {
    return this.http.get<Blog>(this.serverUrl + 'billings/').pipe(
      catchError(this.handleError)
    );
  }

  find_client(id: number) {
    return this.http.get<Blog>(this.serverUrl + 'billings/appointments_by_client/id/' + id).pipe(
      catchError(this.handleError)
    );
  }

  find(id: number) {
    return this.http
      .get<Blog>(this.serverUrl + "billings/" + id)
      .pipe(catchError(this.handleError));
  }

  getId(id: number) {
    return this.http
      .get<Blog>(this.serverUrl + "billings/id/" + id)
      .pipe(catchError(this.handleError));
  }

  create(blog) {
    return this.http
      .post<any>(this.serverUrl + "billings/create", blog)
      .pipe(catchError(this.handleError));
  }

  update(blog, id: number) {
    return this.http
      .post<any>(this.serverUrl + "billings/update/" + id, blog)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http
      .delete(this.serverUrl + "billings/delete/" + id)
      .pipe(catchError(this.handleError));
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
