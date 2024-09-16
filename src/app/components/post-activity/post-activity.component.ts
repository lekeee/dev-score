import { Component, Input } from '@angular/core';
import { Notification } from '../../core/types/notifications';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.component.html',
  styleUrl: './post-activity.component.scss',
})
export class PostActivityComponent {
  @Input() notification: Notification = {
    user: undefined,
    text: '',
    date: new Date(),
    time: '',
  };
}
