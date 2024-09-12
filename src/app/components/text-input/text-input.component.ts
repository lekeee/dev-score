import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() control = new FormControl();

  isPasswordVisible: boolean = false;

  showPassword() {
    if (this.type === 'password' && this.control.value.length > 0) {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
}
