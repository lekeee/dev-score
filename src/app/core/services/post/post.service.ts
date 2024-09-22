import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/post';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(title?: string, language?: string) {
    let params = new HttpParams();

    if (title) params = params.set('title', title);
    if (language) params = params.set('language', language);

    return this.http
      .get<Post[]>('/posts', { params })
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

  getTrendingPosts() {
    return this.http.get<Post[]>('/posts/trending');
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
