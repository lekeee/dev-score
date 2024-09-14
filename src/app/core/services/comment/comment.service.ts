import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../../dtos/comment';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsOfReaction(reactionId: number) {
    return this.http.get<Comment[]>('/comments/reaction/' + reactionId);
  }

  createComment(comment: CommentDto) {
    return this.http.post('/comments', comment);
  }
}
