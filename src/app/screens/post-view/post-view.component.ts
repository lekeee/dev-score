import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from '../../core/models/post';
import { findMyPost } from '../../core/store/post/post.actions';
import { selectMyPost } from '../../core/store/post/post.selectors';

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
    reactionsNumber: 0,
    likesNumber: 0,
    user: undefined,
    createdAt: new Date(),
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.store.dispatch(findMyPost({ id: this.id }));
    this.store.select(selectMyPost).subscribe({
      next: (res) => {
        if (res === null) this.router.navigate(['']);
        this.post = res!;
      },
      error: (err) => console.log(err),
    });
  }
}
