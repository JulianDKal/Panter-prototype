import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  isMenuHidden = false;

  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

}
export class AppComponent {
  projectsPart2 = [
    {
      id: 1,
      name: 'Project 1',
      imageUrl: 'assets/images/project1.png', 
      description: 'Description for Project 1'
    },
    {
      id: 2,
      name: 'Project 2',
      imageUrl: 'assets/images/project2.png',
      description: 'Description for Project 2'
    },
  ]
}
