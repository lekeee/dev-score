import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/post';
import { PostService } from '../../core/services/post/post.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  trendingPost$: Observable<Post[]> = of([]);

  constructor(private postService: PostService) {
    this.trendingPost$ = postService.getTrendingPosts();
  }
}
