import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() errors: ValidationErrors | null = {};
  errorMessages: Record<string, (error: any) => string> = {
    required: () => 'The field is required.',
    email: () => 'Please enter a valid email address.',
    minlength: (error) =>
      `The field must be at least ${error.requiredLength} characters long. You have entered ${error.actualLength}.`,
  };
}
