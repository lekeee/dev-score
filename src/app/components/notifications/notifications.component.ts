import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ReactionService } from '../../core/services/reaction/reaction.service';
import { LikeService } from '../../core/services/like/like.service';
import { CommentService } from '../../core/services/comment/comment.service';
import { Notification } from '../../core/types/notifications';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private reactionsService: ReactionService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLogged) => {
      this.isLoggedIn = isLogged;
      if (isLogged) {
        forkJoin({
          reactions: this.reactionsService.getNotifications(),
          likes: this.likeService.getNotifications(),
          comments: this.commentService.getNotifications(),
        })
          .pipe(
            map(({ reactions, likes, comments }) => {
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
    });
  }
}
