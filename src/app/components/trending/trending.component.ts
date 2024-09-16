import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/post';
import { PostService } from '../../core/services/post/post.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent implements OnInit {
  trendingPost$: Observable<Post[]> = of([]);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.trendingPost$ = this.postService.getTrendingPosts();
  }
}
