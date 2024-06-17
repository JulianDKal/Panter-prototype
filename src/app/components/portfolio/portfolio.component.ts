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


 // Diese Variable speichert den aktuellen Zustand des Graphen
  isGraphHovered = false;

  // Diese Methode wird aufgerufen, wenn der Mauszeiger über den Graphen geht
  hoverGraph(isHovering: boolean) {
    this.isGraphHovered = isHovering;
  }

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
