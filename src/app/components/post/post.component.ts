import { Component, Input } from '@angular/core';
import { Post } from '../../core/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() isFlex: boolean = false;
  @Input() post: Post = {
    title: '',
    description: '',
    language: '',
    code: '',
    user: undefined,
    createdAt: new Date(),
  };
  maxLength = 145;

  isTruncated: boolean = false;

  get cutDescription(): string {
    return this.post.description.length > this.maxLength && !this.isTruncated
      ? this.post.description.substring(0, this.maxLength) + '...'
      : this.post.description;
  }

  openDescription(): void {
    this.isTruncated = true;
  }
}
