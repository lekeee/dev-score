import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reaction } from '../../models/reaction';
import { ReactionDto } from '../../dtos/reaction';
import { map, Observable } from 'rxjs';
import { Notification } from '../../types/notifications';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  constructor(private http: HttpClient) {}

  getReactionsOfPost(postId: number) {
    return this.http.get<Reaction[]>('/reactions/post/' + postId);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Reaction[]>('/reactions/notifications').pipe(
      map((reactions) => {
        return reactions.map((reaction) => {
          let not: Notification = {
            user: reaction.user,
            text: ' reacted to your post. ',
            date: reaction.createdAt,
            time: moment(reaction.createdAt).fromNow(),
          };
          return not;
        });
      })
    );
  }

  createReaction(reaction: ReactionDto) {
    return this.http.post('/reactions', reaction);
  }
}
