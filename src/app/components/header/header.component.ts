import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Ispravka: `styleUrl` treba da bude `styleUrls`
})
export class HeaderComponent {
  isScrolled = false;
  isMobile = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 60;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenWidth();
  }

  ngOnInit() {
    this.checkScreenWidth(); 
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth < 768; 
  }
}
