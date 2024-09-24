import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { logout } from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  showComponent = new BehaviorSubject<string>('dashboard');

  constructor(private store: Store) {}

  showDashboard() {
    this.showComponent.next('dashboard');
  }

  showPosts() {
    this.showComponent.next('posts');
  }

  logutUser() {
    this.store.dispatch(logout());
  }
}
