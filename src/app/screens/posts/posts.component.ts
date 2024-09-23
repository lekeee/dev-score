import { Component, OnInit } from '@angular/core';
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
import { selectFilteredPosts } from '../../core/store/post/post.selectors';
import { setFilters } from '../../core/store/post/post.actions';
import { Filters } from '../../core/types/filters';

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
    this.post$ = this.store.select(selectFilteredPosts);

    combineLatest([this.titleFilter$, this.languageFilter$]).subscribe(
      ([title, language]) => {
        this.store.dispatch(
          setFilters({ filters: { title: title, language: language } })
        );
      }
    );
  }

  onLanguageSelect(event: string) {
    this.languageFilter$.next(event);
  }

  onSearch(event: string) {
    this.titleFilter$.next(event);
  }
}
