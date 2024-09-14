import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/user';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private userId: number = -1;
  private user: Observable<User> = of();
  isScrolled: boolean = false;
  isNotificationsOpen: boolean = false;
  public image: string = '';

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
      } else this.image = '';
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 60;
  }

  toogleNoitifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}
