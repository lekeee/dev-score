import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() isFlex: boolean = false;
  maxLength = 145;
  description: string =
    'Here’s a brief description of what the code does: This C program uses the MPI (Message Passing Interface) library to demonstrate basic inter-process communication. The program initializes MPI, then each process in a parallel environment performs the following steps: Root Process (Rank 0): Initializes a value and sends it to the next process in the sequence.';
  isTruncated: boolean = false;

  get cutDescription(): string {
    return this.description.length > this.maxLength && !this.isTruncated
      ? this.description.substring(0, this.maxLength) + '...'
      : this.description;
  }

  openDescription(): void {
    this.isTruncated = true;
  }
}
