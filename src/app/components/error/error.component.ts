import { Component, Input } from '@angular/core';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() message: ResponseMessage = { type: '', text: '' };
}
