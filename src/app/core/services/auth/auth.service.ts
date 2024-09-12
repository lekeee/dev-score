import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthLogin } from '../../models/auth-login';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { AuthRegister } from '../../models/auth-register';
import { catchError, throwError } from 'rxjs';

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

  login(authLogin: AuthLogin) {
    return this.http
      .post<any>('/auth/login', authLogin)
      .pipe(
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
  }

  isAuth() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = this.getAuthToken();

    let decodedToken = null;
    if (token != null) {
      decodedToken = jwtDecode(token);
    }

    return decodedToken && decodedToken.exp
      ? decodedToken.exp > Date.now() / 1000
      : false;
  }

  getAuthToken() {
    if (!isPlatformBrowser(this.platformId)) return;
    return localStorage.getItem(environment.JWT_NAME);
  }

  getAuthId(): number {
    const token = this.getAuthToken();
    return Number(jwtDecode(token!).sub);
  }
}
