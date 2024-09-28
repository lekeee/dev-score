import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { selectIsLoggedIn } from '../../core/store/auth/auth.selectors';
import { selectAuthImage } from '../../core/store/user/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled: boolean = false;
  isNotificationsOpen = new BehaviorSubject<boolean>(false);
  isLoggedIn: boolean = false;

  public image: string | undefined = '';
  private scrollSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectAuthImage)
      .subscribe((image) => (this.image = image));

    if (typeof window !== 'undefined')
      this.scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
        const scrollPosition =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        this.isScrolled = scrollPosition > 60;
      });

    this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  toogleNoitifications() {
    if (this.isLoggedIn)
      this.isNotificationsOpen.next(!this.isNotificationsOpen.value);
    else this.router.navigate(['login']);
  }
}
