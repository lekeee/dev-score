import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/post';
import { selectTrendingPosts } from '../../core/store/post/post.selectors';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent implements OnInit {
  trendingPost$: Observable<Post[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.trendingPost$ = this.store.select(selectTrendingPosts);
  }
}
