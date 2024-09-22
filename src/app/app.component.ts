import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadPosts } from './core/store/post/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dev-score';

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.authService.setLoginStatus();
  }
}
