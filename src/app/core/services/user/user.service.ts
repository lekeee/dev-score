import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get<User>(`/users/${id}`);
  }

  updateUser(user: Partial<User>) {
    return this.http.put<User>('/users', user);
  }

  uploadImage(formData: FormData) {
    return this.http.post('/users/upload', formData);
  }
}
