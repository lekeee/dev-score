import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeDto } from '../../dtos/like';
import { Like } from '../../models/like';
import { map, Observable } from 'rxjs';
import { Notification } from '../../types/notifications';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Like[]>('/likes/notifications').pipe(
      map((likes) => {
        return likes.map((like) => {
          let not: Notification = {
            user: like.user,
            text: ' liked your post. ',
            date: like.createdAt,
            time: moment(like.createdAt).fromNow(),
          };
          return not;
        });
      })
    );
  }

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
