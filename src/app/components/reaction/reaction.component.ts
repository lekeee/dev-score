import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reaction } from '../../core/models/reaction';
import moment from 'moment';

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
    createdAt: new Date(),
  };
  postedTime: string = '';
  replayClicked: boolean = false;

  ngOnInit(): void {
    this.postedTime = moment(this.reaction.createdAt).fromNow();
  }

  onReplyClick() {
    this.replayClicked = !this.replayClicked;
  }
}
