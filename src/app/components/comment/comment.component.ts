import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.postedTime = moment(this.comment.createdAt).fromNow();
  }
}
