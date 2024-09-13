import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../core/models/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss',
})
export class PostViewComponent implements OnInit {
  id: number = -1;
  post: Post = {
    title: '',
    description: '',
    language: '',
    code: '',
    user: undefined,
    createdAt: new Date(),
  };

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.postService.getPost(this.id).subscribe({
      next: (res) => {
        if (res === null) this.router.navigate(['']);
        this.post = res;
      },
      error: (err) => console.log(err),
    });
  }
}
