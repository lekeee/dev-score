import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../../core/models/post';
import { AuthService } from '../../core/services/auth/auth.service';
import { LikeService } from '../../core/services/like/like.service';
import { likePost, unlikePost } from '../../core/store/post/post.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnChanges {
  @Input() isFlex: boolean = false;
  @Input() post: Post = {
    title: '',
    description: '',
    language: '',
    code: '',
    reactionsNumber: 0,
    likesNumber: 0,
    user: undefined,
    createdAt: new Date(),
  };
  maxLength = 145;
  isTruncated: boolean = false;
  isLiked!: boolean;

  constructor(
    private likeService: LikeService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post.id && this.authService.isAuth()) {
      this.likeService.isPostLikedByUser(this.post.id!).subscribe((res) => {
        this.isLiked = res;
      });
    }
  }

  get cutDescription(): string {
    return this.post.description.length > this.maxLength && !this.isTruncated
      ? this.post.description.substring(0, this.maxLength) + '...'
      : this.post.description;
  }

  openDescription(): void {
    this.isTruncated = true;
  }

  likePostfn() {
    this.store.dispatch(likePost({ id: this.post.id! }));
  }

  unLikePostfn() {
    this.store.dispatch(unlikePost({ id: this.post.id! }));
  }
}
