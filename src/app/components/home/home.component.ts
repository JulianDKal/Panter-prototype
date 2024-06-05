import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private dataService:DataService){}

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

