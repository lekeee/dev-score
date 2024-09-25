import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { restoreStatus } from './core/store/auth/auth.actions';
import { loadPosts } from './core/store/post/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dev-score';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.store.dispatch(restoreStatus());
  }
}
