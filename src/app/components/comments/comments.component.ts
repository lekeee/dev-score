import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReactionService } from '../../core/services/reaction/reaction.service';
import { Reaction } from '../../core/models/reaction';
import { ReactionDto } from '../../core/dtos/reaction';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() isFlex: boolean = false;
  @Input() postId: number = -1;
  reaction$: Observable<Reaction[]> = of([]);
  reactionDto: ReactionDto = {
    type: -1,
    text: '',
    postId: -1,
  };

  //for style
  reactionsCount: number = 123;
  isShowed: boolean = false;
  isAddShowed: boolean = false;
  type: string = 'reaction';

  constructor(private reactionService: ReactionService) {}

  loadReactions() {
    this.reaction$ = this.reactionService.getReactionsOfPost(this.postId);
    //this.reaction$.subscribe((res) => console.log(res));
  }

  showReactions(): void {
    this.isShowed = !this.isShowed;
    if (this.isShowed == true) this.loadReactions();
  }

  showAddReactions(): void {
    this.isAddShowed = true;
    this.reactionDto.postId = this.postId;
  }

  setPositive() {
    this.reactionDto.type = 0;
  }

  setNegative() {
    this.reactionDto.type = 1;
  }

  postReaction() {
    if (this.reactionDto.text === '' || this.reactionDto.type === -1) return;

    this.reactionService.createReaction(this.reactionDto).subscribe({
      next: () => {
        this.reactionDto.text = '';
        this.reactionDto.type = -1;
        this.loadReactions();
      },
    });
  }
}
