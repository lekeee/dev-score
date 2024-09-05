import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.component.html',
  styleUrl: './post-activity.component.scss',
})
export class PostActivityComponent {
  @Input() type: number = 0;
}
