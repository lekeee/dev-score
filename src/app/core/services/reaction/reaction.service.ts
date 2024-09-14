import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reaction } from '../../models/reaction';
import { ReactionDto } from '../../dtos/reaction';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  constructor(private http: HttpClient) {}

  getReactionsOfPost(postId: number) {
    return this.http.get<Reaction[]>('/reactions/post/' + postId);
  }

  createReaction(reaction: ReactionDto) {
    return this.http.post('/reactions', reaction);
  }
}
