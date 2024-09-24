import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthLogin } from '../../core/dtos/auth-login';
import { login } from '../../core/store/auth/auth.actions';
import { selectResponseMessage } from '../../core/store/auth/auth.selectors';
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

  message$: Observable<ResponseMessage> = of();

  constructor(private store: Store) {
    this.message$ = store.select(selectResponseMessage);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(
      login({ authLogin: this.loginForm.value as AuthLogin })
    );

    // this.authService.login(this.loginForm.value as AuthLogin).subscribe({
    //   next: (res) => {
    //     this.router.navigate(['']);
    //   },
    //   error: (err) => (
    //     (this.message.text = err.message), (this.message.type = 'error')
    //   ),
    // });
  }
}
