import { Component, Input } from '@angular/core';

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
  @Input() enabled: boolean = true;

  password = '';
  isPasswordVisible = false;

  showPassword() {
    if (this.password.length > 0) {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
}
