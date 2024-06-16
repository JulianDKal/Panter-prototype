import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    // Initiale Prüfung bei der Komponenten-Initialisierung
    this.checkScroll();
    this.checkScroll2();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
    this.checkScroll2();
  }

  checkScroll() {
    const headerContainer = document.querySelector('.header-container');
    if (window.scrollY > 50) {
      headerContainer?.classList.add('shrink');
    } else {
      headerContainer?.classList.remove('shrink');
    }
  }

  checkScroll2() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
}

