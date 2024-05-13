import { Component, Inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { Chart } from '../../Chart';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent,ChartElementComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  charts:Chart[] = [];
  //dataService:DataService = Inject(DataService);

  constructor(private dataService:DataService)
  {
    console.log("Portfolio was created!");
    console.log(this.dataService.data);
  }
  
}
