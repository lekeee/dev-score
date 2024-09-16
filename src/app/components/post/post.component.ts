import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../core/models/post';
import { LikeService } from '../../core/services/like/like.service';
import { AuthService } from '../../core/services/auth/auth.service';

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
  isLiked = false;

  constructor(
    private likeService: LikeService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post.id) {
      this.authService.loggedIn$.subscribe((isLogged) => {
        if (isLogged)
          this.likeService.isPostLikedByUser(this.post.id!).subscribe((res) => {
            this.isLiked = res;
          });
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

  likePost() {
    this.likeService.createLike({ postId: this.post.id! }).subscribe(() => {
      this.isLiked = true;
      this.post.likesNumber++;
    });
  }

  unLikePost() {
    this.likeService.deleteLike(this.post.id!).subscribe(() => {
      this.isLiked = false;
      this.post.likesNumber--;
    });
  }
}
