import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  reactionsCount: number = 123;
  isShowed: boolean = false;

  showReactions(): void {
    this.isShowed = !this.isShowed;
  }
}
