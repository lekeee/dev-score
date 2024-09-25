import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, zip } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommentService } from '../../core/services/comment/comment.service';
import { LikeService } from '../../core/services/like/like.service';
import { ReactionService } from '../../core/services/reaction/reaction.service';
import { Notification } from '../../core/types/notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          height: '0px',
          opacity: 0,
          transform: 'translateX(100%)',
        })
      ),
      transition('in => out', [animate('350ms ease-in-out')]),
      transition('out => in', [animate('350ms ease-in-out')]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() notfCloseClick = new EventEmitter();
  notifications: Notification[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private reactionsService: ReactionService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  get stateName() {
    return this.isOpen ? 'in' : 'out';
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuth() ? true : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    if (!this.isLoggedIn) return;

    zip(
      this.reactionsService.getNotifications(),
      this.likeService.getNotifications(),
      this.commentService.getNotifications()
    )
      .pipe(
        map(([reactions, likes, comments]) => {
          const allNotifications: Notification[] = [
            ...reactions,
            ...likes,
            ...comments,
          ];

          return allNotifications.sort((a, b) => {
            a.date = new Date(a.date);
            b.date = new Date(b.date);
            return b.date.getTime() - a.date.getTime();
          });
        })
      )
      .subscribe((sortedNotfs) => {
        this.notifications = sortedNotfs;
        //console.log(this.notifications);
      });
  }

  clickedClose() {
    this.notfCloseClick.emit();
  }
}
