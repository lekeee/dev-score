import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent {
  @Input() errors: ValidationErrors | null = {};
  errorMessages: Record<string, (error: any) => string> = {
    required: () => 'The field is required.',
    email: () => 'Please enter a valid email address.',
    minlength: (error) =>
      `The field must be at least ${error.requiredLength} characters long. You have entered ${error.actualLength}.`,
  };
}
