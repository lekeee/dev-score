import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthRegister } from '../../core/models/auth-register';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  message: ResponseMessage = { type: '', text: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.invalid) return;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.message.text = 'Password do not match';
      this.message.type = 'error';
      return;
    }
    this.authService
      .register(this.registerForm.value as AuthRegister)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['login']);
        },
        error: (err) => (
          (this.message.text = err.message), (this.message.type = 'error')
        ),
      });
  }
}
