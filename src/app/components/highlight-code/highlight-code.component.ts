import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-code',
  templateUrl: './highlight-code.component.html',
  styleUrl: './highlight-code.component.scss',
})
export class HighlightCodeComponent {
  @Input() code: string = ``;
  @Input() language: string = ``;
}
