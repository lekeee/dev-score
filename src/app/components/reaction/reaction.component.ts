import { Component, Input, OnInit } from '@angular/core';
import { Reaction } from '../../core/models/reaction';
import moment from 'moment';
import { CommentDto } from '../../core/dtos/comment';
import { CommentService } from '../../core/services/comment/comment.service';
import { map, Observable, of } from 'rxjs';
import { Comment } from '../../core/models/comment';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrl: './reaction.component.scss',
})
export class ReactionComponent implements OnInit {
  @Input() reaction: Reaction = {
    id: -1,
    type: -1,
    text: '',
    commentsNumber: 0,
    createdAt: new Date(),
  };
  postedTime: string = '';
  replayClicked: boolean = false;
  isCommentsShowed: boolean = false;

  comment: CommentDto = {
    text: '',
    reactionId: -1,
  };

  comment$: Observable<Comment[]> = of([]);

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.postedTime = moment(this.reaction.createdAt).fromNow();
  }

  loadComments() {
    this.comment$ = this.commentService.getCommentsOfReaction(
      this.reaction.id!
    );
    this.comment$.subscribe((res) => console.log(res));
  }

  onReplyClick() {
    this.replayClicked = !this.replayClicked;
  }

  postComment() {
    if (this.comment.text === '') return;
    this.comment.reactionId = this.reaction.id!;

    this.commentService.createComment(this.comment).subscribe({
      next: () => {
        this.comment.text = '';
        this.loadComments();
      },
    });
  }

  showComments() {
    this.isCommentsShowed = true;
    this.loadComments();
  }
}
