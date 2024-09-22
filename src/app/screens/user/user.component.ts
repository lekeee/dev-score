import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  showComponent = new BehaviorSubject<string>('dashboard');

  constructor(private authService: AuthService, private router: Router) {}

  showDashboard() {
    this.showComponent.next('dashboard');
  }

  showPosts() {
    this.showComponent.next('posts');
  }

  logutUser() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
