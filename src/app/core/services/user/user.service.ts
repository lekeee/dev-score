import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get<User>(`/users/${id}`);
  }

  getUserByToken(token: string) {
    const id = Number(jwtDecode(token).sub);
    return this.getUser(id);
  }

  updateUser(user: Partial<User>) {
    return this.http.put<User>('/users', user);
  }

  uploadImage(formData: FormData) {
    return this.http.post('/users/upload', formData);
  }
}
