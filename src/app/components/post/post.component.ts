import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../core/models/post';
import { AuthService } from '../../core/services/auth/auth.service';
import { LikeService } from '../../core/services/like/like.service';

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
  @Output() likeClick = new EventEmitter<string>();
  maxLength = 145;
  isTruncated: boolean = false;
  isLiked!: boolean;

  constructor(
    private likeService: LikeService,
    private authService: AuthService
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
    this.likeClick.emit('like');
  }

  unLikePostfn() {
    this.likeClick.emit('unlike');
  }
}
