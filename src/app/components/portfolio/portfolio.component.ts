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
    const mainDisciplines:CountMap = dataService.countsOfDisciplines!;
    const keysArray = Object.keys(mainDisciplines);
    const valuesArray = Object.values(mainDisciplines);

    this.chartData = [{
      labels: keysArray,
      values: valuesArray,
      type: 'pie',
      //marker: {color: 'lightblue'} 
    }]
    this.chartLayout = {
      width: 400, height: 290, title: 'Main Disciplines in Portfolio'
    }
    this.chart = new Chart(this.chartLayout, this.chartData);
  }
  
}
