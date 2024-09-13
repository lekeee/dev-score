import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/user';
import { environment } from '../../../environments/environment.development';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  message: ResponseMessage = { type: '', text: '' };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  dashboardForm = new FormGroup({
    image: new FormControl(''),
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.minLength(6)]),
  });

  ngOnInit() {
    const id = this.authService.getAuthId();

    this.userService.getUser(id).subscribe({
      next: (user: User) => {
        this.dashboardForm.patchValue({
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          password: user.password,
          image: user.image
            ? `${environment.API_URL}/uploads/${user.image}`
            : '',
        });
      },
    });
  }

  onSubmit() {
    const fullname = this.dashboardForm.get('fullname') as FormControl;
    const username = this.dashboardForm.get('username') as FormControl;
    const password = this.dashboardForm.get('password') as FormControl;
    const confirmPassword = this.dashboardForm.get(
      'confirmPassword'
    ) as FormControl;

    const updatePayload: Partial<User> = {};

    if (this.dashboardForm.invalid || this.dashboardForm.pristine) return;

    if (fullname.dirty) updatePayload.fullname = fullname.value;
    if (username.dirty) updatePayload.username = username.value;
    if (password.dirty) {
      if (
        password.value &&
        confirmPassword.value &&
        password.value == confirmPassword.value
      )
        updatePayload.password = password.value;
      else {
        password.setValue('');
        confirmPassword.setValue('');
        this.message.text = 'Passwords do not match';
        this.message.type = 'error';
      }
    }

    if (Object.keys(updatePayload).length != 0)
      this.userService.updateUser(updatePayload).subscribe({
        next: (res) => {
          password.setValue('');
          confirmPassword.setValue('');
          this.dashboardForm.markAsPristine();
          this.message.text = 'Your data has been successfully updated.';
          this.message.type = 'success';
        },
        error: (err) => {
          this.message.text = err.error.message;
          this.message.type = 'error';
        },
      });
  }
}
