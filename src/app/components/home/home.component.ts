import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { HeaderComponent } from '../header/header.component';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent, TestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}

  routeToPortfolio(){
    console.log("clicked");
    this.router.navigate(['../portfolio']);
  }
}

function toggleMenu(): void {
  const menu: HTMLElement | null = document.getElementById('menu');
  if (menu) {
      if (menu.classList.contains('hidden')) {
          menu.classList.remove('hidden');
          menu.classList.add('visible');
      } else {
          menu.classList.remove('visible');
          menu.classList.add('hidden');
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-btn');
  if (menuButton) {
      menuButton.addEventListener('click', toggleMenu);
  }
});

