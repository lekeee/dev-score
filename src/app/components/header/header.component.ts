import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { User } from '../../core/models/user';
import { selectAuthImage } from '../../core/store/user/user.selectors';

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
  public image: string | undefined = '';
  private scrollSubscription!: Subscription;

  constructor(private store: Store) {}

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
