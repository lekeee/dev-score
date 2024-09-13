import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/post';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<Post[]>('/posts')
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => new Error(err.error.message))
        )
      );
  }

  getPost(id: number) {
    return this.http.get<Post>('/posts/' + id);
  }

  getPostsByUser() {
    return this.http.get<Post[]>('/posts/user');
  }

  createPost(post: Post) {
    return this.http.post<Post>('/posts', post);
  }

  updatePost(id: number, post: Partial<Post>) {
    return this.http.put('/posts/' + id, post);
  }

  deletePost(id: number) {
    return this.http.delete('/posts/' + id);
  }
}
