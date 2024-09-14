import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthLogin } from '../../dtos/auth-login';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { AuthRegister } from '../../dtos/auth-register';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId: Object;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

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

    const token = this.getAuthToken();
    if (!token) return false;

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
    if (!isPlatformBrowser(this.platformId)) return;
    return localStorage.getItem(environment.JWT_NAME);
  }

  getAuthId(): number {
    const token = this.getAuthToken();
    return token ? Number(jwtDecode(token!).sub) : -1;
  }
}
