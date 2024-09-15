import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeDto } from '../../dtos/like';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(likeDto: LikeDto) {
    return this.http.post('/likes', likeDto);
  }

  isPostLikedByUser(postId: number) {
    return this.http.get<boolean>('/likes/post/' + postId);
  }

  deleteLike(postId: number) {
    return this.http.delete('/likes/' + postId);
  }
}
