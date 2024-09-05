import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Ispravka: `styleUrl` treba da bude `styleUrls`
})
export class HeaderComponent {
  isScrolled: boolean = false;
  isNotificationsOpen: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 60;
  }

  toogleNoitifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}
