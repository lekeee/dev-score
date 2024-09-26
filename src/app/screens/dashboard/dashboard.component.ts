import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../core/models/user';
import { updateUser } from '../../core/store/user/user.actions';
import {
  selectAuthenticated,
  selectResponseMessage,
} from '../../core/store/user/user.selectors';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  message: ResponseMessage = { type: '', text: '' };
  id: number = -1;
  user$: Observable<User | null> = of();

  constructor(private store: Store) {}

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
    this.user$ = this.store.select(selectAuthenticated);

    this.user$.subscribe({
      next: (user) => {
        this.id = user?.id!;
        this.dashboardForm.patchValue({
          fullname: user?.fullname,
          username: user?.username,
          email: user?.email,
          password: user?.password,
          image: user?.image
            ? `${environment.API_URL}/uploads/${user.image}`
            : '',
        });
      },
    });

    this.store
      .select(selectResponseMessage)
      .subscribe((msg) => (this.message = msg!));
  }

  onSubmit() {
    const fullname = this.dashboardForm.get('fullname') as FormControl;
    const username = this.dashboardForm.get('username') as FormControl;
    const password = this.dashboardForm.get('password') as FormControl;
    const confirmPassword = this.dashboardForm.get(
      'confirmPassword'
    ) as FormControl;

    const updatePayload: Partial<User> = {};
    updatePayload.id = this.id;

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
      }
    }

    if (Object.keys(updatePayload).length != 0)
      this.store.dispatch(updateUser({ updatePayload }));
  }
}
