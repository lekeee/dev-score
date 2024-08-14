import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  onDashboard : boolean = true;
  onPosts : boolean = false;

  showDashboard(){
    this.onDashboard = true;
    this.onPosts = false;
  }

  showPosts(){
    this.onDashboard = false;
    this.onPosts = true;
  }
}
