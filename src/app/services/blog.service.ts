import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get<Blog>(this.serverUrl + 'blog/adminBlogs').pipe(
      catchError(this.handleError)
    );
  }

  getBlog(id: number) {
    return this.http.get<Blog>(this.serverUrl + 'blog/adminBlog/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'blog/createBlog', blog).pipe(
      catchError(this.handleError)
    );
  }

  updateBlog(blog, id: number) {
    return this.http.post<any>(this.serverUrl + 'blog/updateBlog/' + id, blog).pipe(
      catchError(this.handleError)
    );
  }

  deleteBlog(id: number) {
    return this.http.delete(this.serverUrl + 'blog/deleteBlog/' + id).pipe(
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
