import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthLogin } from '../../dtos/auth-login';
import { AuthRegister } from '../../dtos/auth-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId: Object;
  private token: string | null = null;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId))
      this.token = localStorage.getItem(environment.JWT_NAME);
  }
  //obrisati ovaj tok totalno nakon impl stora
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuth()!!);
  public loggedIn$ = this.loggedInSubject.asObservable();

  login(authLogin: AuthLogin) {
    return this.http.post<any>('/auth/login', authLogin).pipe(
      tap((res) => {
        localStorage.setItem(environment.JWT_NAME, res.access_token);
        this.loggedInSubject.next(true);
      }),
      catchError((error: HttpErrorResponse) =>
        throwError(() => new Error(error.error.message))
      )
    );
  }

  register(authRegister: AuthRegister) {
    return this.http
      .post<AuthRegister>('/auth/register', authRegister)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.error.message))
        )
      );
  }

  logout() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(environment.JWT_NAME);
    this.loggedInSubject.next(false);
  }

  isAuth() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.token) return false;

    let decodedToken = jwtDecode(this.token);

    return decodedToken && decodedToken.exp
      ? decodedToken.exp > Date.now() / 1000
      : false;
  }

  isTokenValid(token: string) {
    let decodedToken = jwtDecode(token);

    return decodedToken && decodedToken.exp
      ? decodedToken.exp > Date.now() / 1000
      : false;
  }

  setLoginStatus() {
    if (this.isAuth()) this.loggedInSubject.next(true);
    else this.loggedInSubject.next(false);
  }

  getAuthToken() {
    return this.token;
  }

  getAuthId(): number {
    return this.token ? Number(jwtDecode(this.token!).sub) : -1;
  }

  getIdFromToken(token: string) {
    return Number(jwtDecode(this.token!).sub);
  }
}
