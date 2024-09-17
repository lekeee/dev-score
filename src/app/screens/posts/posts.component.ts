import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/models/post';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  post$: Observable<Post[]> = of([]);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.getPosts();
    //this.post$.subscribe((res) => console.log(res));
  }

  onLanguageSelect(event: string) {
    this.post$ = this.postService.getPostByLanguage(event);
    //this.post$.subscribe((res) => console.log(res));
  }

  onSearch(event: string) {
    this.post$ = this.postService.getPostByTitle(event);
  }
}
