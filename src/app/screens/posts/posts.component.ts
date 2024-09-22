import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/models/post';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAllPosts } from '../../core/store/post/post.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  post$: Observable<Post[]> = of([]);

  private languageFilter$ = new BehaviorSubject<string>('');
  private titleFilter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.post$ = this.store.select(selectAllPosts);
  }

  onLanguageSelect(event: string) {
    this.languageFilter$.next(event);
  }

  onSearch(event: string) {
    this.titleFilter$.next(event);
  }
}
