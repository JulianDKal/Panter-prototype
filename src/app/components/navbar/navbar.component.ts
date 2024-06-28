

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;
  selectedPortfolio = 'Portfolio';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectPortfolio(portfolio: string) {
    this.selectedPortfolio = portfolio;
    this.dropdownOpen = false;
  }
}
