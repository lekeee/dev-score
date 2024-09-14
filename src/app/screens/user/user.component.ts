import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  onDashboard: boolean = true;
  onPosts: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  showDashboard() {
    this.onDashboard = true;
    this.onPosts = false;
  }

  showPosts() {
    this.onDashboard = false;
    this.onPosts = true;
  }

  logutUser() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
