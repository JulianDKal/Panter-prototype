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
  chart:Chart;
  chartData:plotData[];
  chartLayout:plotLayout;

  constructor(private dataService:DataService)
  {
    this.chartData = [{
      x: [1, 2, 3], 
      y: [2, 5, 3], 
      type: 'bar',
      marker: {color: 'lightblue'} 
    }]
    this.chartLayout = {
      width: 400, height: 290, title: 'example plot'
    }
    this.chart = new Chart(this.chartLayout, this.chartData);
  }
  
}
