import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../../models/auth-login';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(authLogin: AuthLogin) {
    return this.http.post<any>(environment.apiUrl + '/auth/login', authLogin);
  }
}
