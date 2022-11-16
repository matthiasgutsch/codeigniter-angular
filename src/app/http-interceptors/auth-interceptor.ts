import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

const TOKEN_HEADER_KEY = "Authorization";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      let authReq = req;
      const authToken = this.authService.getAuthorizationToken();
      if (authToken != null && !authReq.url.includes("auth/refresh")) {
        authReq = this.addTokenHeader(req, authToken);
      }

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            authReq.url.includes("auth/refresh") &&
            error.status === 401
          ) {
            this.authService.logout().subscribe();
          } else if (
            error instanceof HttpErrorResponse &&
            !authReq.url.includes("auth/signin") &&
            error.status === 401
          ) {
            return this.handle401Error(authReq, next);
          }

          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getRefreshToken();

      if (token && this.authService.isLoggedIn()) {
        return this.authService.refreshToken(token).pipe(
          switchMap((tokens) => {
            this.isRefreshing = false;
            if (tokens?.accessToken) {
              localStorage.setItem("currentTokens", JSON.stringify(tokens));
            }
            const authToken = this.authService.getAuthorizationToken();
            this.refreshTokenSubject.next(authToken);
            return next.handle(this.addTokenHeader(request, authToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(error);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((tokens) => next.handle(this.addTokenHeader(request, tokens)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, token),
    });
  }
}
