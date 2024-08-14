import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrl: './background-image.component.scss'
})
export class BackgroundImageComponent {
  @Input() url : string = '';
}
