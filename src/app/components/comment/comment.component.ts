import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../core/models/comment';
import moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment = {
    text: '',
    createdAt: new Date(),
  };
  postedTime: string = '';
  @Output() onReplyClick = new EventEmitter<string>();

  ngOnInit(): void {
    this.postedTime = moment(this.comment.createdAt).fromNow();
  }

  replyClicked() {
    this.onReplyClick.emit(this.comment.user?.username);
  }
}
