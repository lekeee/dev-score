import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/user';
import {
  map,
  Observable,
  of,
  Subscription,
  fromEvent,
  BehaviorSubject,
} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled: boolean = false;
  isNotificationsOpen = new BehaviorSubject<boolean>(false);

  private userId: number = -1;
  private user: Observable<User> = of();
  public image: string = '';
  private scrollSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.userId = this.authService.getAuthId();
        this.user = this.userService.getUser(this.userId);
        this.user
          .pipe(
            map((user: User) => {
              return user.image;
            })
          )
          .subscribe({
            next: (image: string) => {
              this.image = image;
            },
          });
      } else {
        this.image = '';
      }
    });
    if (typeof window !== 'undefined')
      this.scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
        const scrollPosition =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        this.isScrolled = scrollPosition > 60;
      });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  toogleNoitifications() {
    this.isNotificationsOpen.next(!this.isNotificationsOpen.value);
  }
}
