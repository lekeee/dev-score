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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  post$: Observable<Post[]> = of([]);

  private languageFilter$ = new BehaviorSubject<string>('');
  private titleFilter$ = new BehaviorSubject<string>('');

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = combineLatest([this.titleFilter$, this.languageFilter$]).pipe(
      switchMap(([title, language]) =>
        this.postService.getPosts(title, language)
      )
    );
  }

  onLanguageSelect(event: string) {
    this.languageFilter$.next(event);
  }

  onSearch(event: string) {
    this.titleFilter$.next(event);
  }
}
