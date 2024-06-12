import { Component, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { BarChart, Chart, PieChart, ScatterChart } from '../../Chart';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent,ChartElementComponent, NgIf],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  private dataReadySubscription: Subscription | null = null;
  isLoading:boolean = true;

  charts:Chart[] = [];

  chartData!:pieData[];
  chartLayout!:plotLayout;

  chartData2!:barData[];
  chartLayout2!:plotLayout;

  constructor(private dataService:DataService) { }

  ngOnInit()
  {
    this.dataReadySubscription = this.dataService.dataReady.subscribe(() => {
      //Daten für den ersten Chart holen und einsetzen
      const mainDisciplines:CountMap = this.dataService.countsOfDisciplines!;
      const keysArray = Object.keys(mainDisciplines);
      const valuesArray = Object.values(mainDisciplines);
  
      this.chartData = [{
        labels: keysArray,
        values: valuesArray,
        type: 'pie',
      }]
      this.chartLayout = {
        width: 400, height: 290, title: 'Main Disciplines in Portfolio', margin: {
          t: 40,
          r: 10, 
          b: 10, 
          l: 10  
        }
      }
  
      //Daten für den zweiten Chart holen und einsetzen
      const disciplines:string[] = this.dataService.mainDisciplines;
      const prices:string[] = this.dataService.apcPrices;
      
      const disciplinesPricesMap = this.dataService.generateCountMap(disciplines, prices); //gibt eine CountMap zurück (string, number)
  
      this.chartData2 = [{
        x: Object.keys(disciplinesPricesMap),
        y: Object.values(disciplinesPricesMap),
        type: 'bar',
        marker: {
          color: 'rgb(158,202,225)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
           
        }
      }]
      this.chartLayout2 = {
        width: 400, height: 290, 
        title: 'APC Prices by Disciplines (in €)', 
        margin: {
          t: 40,
          r: 10, 
          b: 45, 
          l: 45
        },
        xaxis: {
          autorange: true,
          dtick: 1,
          tickfont: {
            size: 10,
            color: '#000000'
          },
          tickangle: 0
        }
      }
  
      this.charts[0] = new PieChart(this.chartLayout, this.chartData);
      this.charts[1] = new BarChart(this.chartLayout2, this.chartData2);
      this.isLoading = false;
    });
}
}


