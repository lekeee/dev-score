import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../../dtos/comment';
import { Comment } from '../../models/comment';
import { map, Observable } from 'rxjs';
import { Notification } from '../../types/notifications';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsOfReaction(reactionId: number) {
    return this.http.get<Comment[]>('/comments/reaction/' + reactionId);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Comment[]>('/comments/notifications').pipe(
      map((comments) => {
        return comments.map((comment) => {
          let not: Notification = {
            user: comment.user,
            text: ' commented on your reaction. ',
            date: comment.createdAt,
            time: moment(comment.createdAt).fromNow(),
          };
          return not;
        });
      })
    );
  }

  createComment(comment: CommentDto) {
    return this.http.post('/comments', comment);
  }
}
