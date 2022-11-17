import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { plainToInstance } from "class-transformer";
import { Subject, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Tokens, User } from "./auth.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  serverUrl = environment.baseUrl;
  errorData: {};
  endTime = 20;
  unsubscribe$: Subject<void> = new Subject();
  // timerSubscription: Subscription;
  minutesDisplay = 0;
  secondsDisplay = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  redirectUrl: string;

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.serverUrl}/auth/login`,
        { username: username, password: password }
      )
      .pipe(
        map((tokens) => {
          if (tokens && tokens.accessToken) {
            localStorage.setItem("currentTokens", JSON.stringify(tokens));
            // this.resetTimer();
          }
        }),
        catchError(this.handleError)
      );
  }

  getProfile() {
    return this.http.get<any>(`${this.serverUrl}/users/profile`).pipe(
      map((user) => {
        if (user && user.id) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      }),
      catchError(this.handleError)
    );
  }

  // resetTimer(endTime: number = this.endTime) {
  //   const interval = 1000;
  //   const duration = endTime * 60;
  //   this.timerSubscription = timer(0, interval)
  //     .pipe(take(duration))
  //     .subscribe(
  //       (value) => this.render((duration - +value) * interval),
  //       (err) => {},
  //       () => {
  //         this.logout();
  //       }
  //     );
  // }

  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }

  isLoggedIn() {
    if (this.getTokens()?.accessToken) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const tokens = this.getTokens();
    return tokens ? `Bearer ${tokens.accessToken}` : "";
  }

  getRefreshToken() {
    const tokens = this.getTokens();
    return tokens ? `Bearer ${tokens.refreshToken}` : "";
  }

  getTokens(): Tokens | null {
    try {
      return plainToInstance(
        Tokens,
        JSON.parse(localStorage.getItem("currentTokens"))
      );
    } catch (error) {}
    return null;
  }

  getUser(): User | null {
    try {
      return plainToInstance(
        User,
        JSON.parse(localStorage.getItem("currentUser"))
      );
    } catch (error) {}
    return null;
  }

  logout() {
    return this.http.get(`${this.serverUrl}/auth/logout`).pipe(
      finalize(() => {
        localStorage.removeItem("currentTokens");
        localStorage.removeItem("currentUser");
        this.router.navigate(["/login"]);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: "Oops! Request for document failed",
      errorDesc: "Something bad happened. Please try again later.",
    };
    return throwError(this.errorData);
  }

  refreshToken(token: string) {
    return this.http.get<{ accessToken: string; refreshToken: string }>(
      `${this.serverUrl}/auth/refresh`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
