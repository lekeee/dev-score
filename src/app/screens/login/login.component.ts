import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthLogin } from '../../core/dtos/auth-login';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  message: ResponseMessage = { type: '', text: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value as AuthLogin).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (err) => (
        (this.message.text = err.message), (this.message.type = 'error')
      ),
    });
  }
}
