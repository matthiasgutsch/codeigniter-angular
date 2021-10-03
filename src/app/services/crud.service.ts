
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { catchError } from 'rxjs/operators';
import { Billings } from '../models/billings';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  currentUser: any ;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  username: string;
  user_id: number;

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  
  getAllList() {
    return this._http.get<T>(this._base + '/').pipe(
      catchError(this.handleError)
    );
  }


  getAllListbyUser() {
    const userId = this.currentUser.user_id;
    return this._http.get<T>(this._base + '/user/' + userId).pipe(
      catchError(this.handleError)
    );
  }



  count() {
    const userId = this.currentUser.user_id;
    return this._http.get<T>(this._base + '/count/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  getToday(userId: number) {
    return this._http.get<T>(this._base + '/today/' + userId).pipe(
      catchError(this.handleError)
    );
  }


  getAllListCalendar() {
    return this._http.get<T>(this._base + 'appointments/calendar/').pipe(
      catchError(this.handleError)
    );
  }

  find_client(id: ID) {
    return this._http.get<T>(this._base + '/appointments_by_client/id/' + id).pipe(
      catchError(this.handleError)
    );
  }

  
  find_billing_client(id: number, ) {
    return this._http.get<Billings>(this._base + '/billings_by_client/' + id)
  }

  find_billings_by_appointments(id: number) {
    return this._http.get<Billings>(this._base + '/billings_by_appointments/' + id)
  }
  
  find_billings_by_appointment_id(id: number) {
    return this._http.get<Billings>(this._base + '/billings_by_appointment_id/' + id)
  }
  

  find(id: ID) {
    return this._http.get<T>(this._base + 'appointments/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getId(id: ID) {
    const userId = this.currentUser.user_id;
    return this._http.get<T>(this._base + '/id/' + id + '/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  getAppointmentId(id: ID) {
    return this._http.get<T>(this._base + '/id/' + id).pipe(
      catchError(this.handleError)
    );
  }

  create(blog) {
    const userId = this.currentUser.user_id;
    return this._http.post<any>(this._base + '/create/' + userId, blog).pipe(
      catchError(this.handleError)
    );
  }

  update(blog, id: number) {
    const userId = this.currentUser.user_id;
    return this._http.post<any>(this._base + '/update/' + id + '/' + userId, blog).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    const userId = this.currentUser.user_id;
    return this._http.delete(this._base + '/delete/' + id + '/' + userId).pipe(
      catchError(this.handleError)
    );
  }

 
  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update_new(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }

  findOne_new(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  findAll_new(): Observable<T[]> {
    return this._http.get<T[]>(this._base)
  }

  delete_new(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
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
