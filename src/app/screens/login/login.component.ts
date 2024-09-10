import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthLogin } from '../../core/models/auth-login';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

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

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.loginForm.value as AuthLogin)
      .pipe(
        catchError((err) => {
          this.error = err.error.message;
          throw err;
        })
      )
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem(environment.JWT_NAME, res.access_token);
        this.router.navigate(['/posts']);
      });
  }
}
