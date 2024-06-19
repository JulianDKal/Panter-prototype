import { Component, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { BarChart, Chart, PieChart, ScatterChart } from '../../Chart';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { OverviewComponentComponent } from '../overview-component/overview-component.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent,ChartElementComponent, GraphContainerComponent, NgIf, OverviewComponentComponent],
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

  //Teil, in dem die Daten geholt werden
  private dataReadySubscription: Subscription | null = null;
  
  charts:Chart[] = [];
  
  chartData!:pieData[];
  chartLayout!:plotLayout;
  
  chartData2!:barData[];
  chartLayout2!:plotLayout;

  chartData3!:scatterData[];
  chartLayout3!:plotLayout;

  donutChartData!:pieData[];
  donutLayout!:plotLayout;

  licenceTypeData!:barData[];
  licenceTypeLayout!:plotLayout;

  modelsDisciplinesData!:barData[];
  modelsDisciplinesLayout!:plotLayout;
  
  constructor(private dataService:DataService) { }
  
  isLoading:boolean = true;

  ngOnInit()
  {
    //this.isLoading = this.dataService.isProcessing;

    if(this.dataService.isProcessing) this.dataReadySubscription = this.dataService.dataReady.subscribe(() => {
      this.createCharts();
      this.isLoading = false;
    });

    else{
      this.createCharts();
      this.isLoading = false;
    }
}

createCharts(){
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
  
  const disciplinesPricesMap = this.dataService.generateAvgPriceMap(disciplines, prices); //gibt eine CountMap zurück (string, number)

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

  const publishingModels19Map = this.dataService.countOccurrences(this.dataService.publishingModels19);
  const publishingModels20Map = this.dataService.countOccurrences(this.dataService.publishingModels20);
  const publishingModels22Map = this.dataService.countOccurrences(this.dataService.publishingModels22);
  const publishingModels23Map = this.dataService.countOccurrences(this.dataService.publishingModels23);

  delete publishingModels19Map["undefined"];
  delete publishingModels20Map["undefined"];
  delete publishingModels22Map["undefined"];
  delete publishingModels23Map["undefined"];

  this.chartData3 = [
    {
      x: Object.keys(publishingModels19Map),
      y: Object.values(publishingModels19Map),
      type: 'scatter',
      name: '2019'
    },
    {
      x: Object.keys(publishingModels20Map),
      y: Object.values(publishingModels20Map),
      type: 'scatter',
      name: '2020'
    },
    {
      x: Object.keys(publishingModels22Map),
      y: Object.values(publishingModels22Map),
      type: 'scatter',
      name: '2022'
    },
    {
      x: Object.keys(publishingModels23Map),
      y: Object.values(publishingModels23Map),
      type: 'scatter',
      name: '2023'
    }
  ]

  this.chartLayout3 = {
    width: 400, height: 290, title: 'Publishing Models', 
    margin: {
      t: 40,
      r: 10, 
      b: 30, 
      l: 45  
    },
    xaxis: {
      tickangle: 0
    }
  }

  this.donutChartData = [{
    labels: keysArray,
    values: valuesArray,
    type: 'pie',
    hole: 0.5
  }]
  this.donutLayout = this.chartLayout;

  const licenseTypesMap = this.dataService.countOccurrences(this.dataService.licenseTypes19);
  delete licenseTypesMap["undefined"];

  this.licenceTypeData = [{
    x: Object.keys(licenseTypesMap),
    y: Object.values(licenseTypesMap),
    type: 'bar',
    marker: {
      color: 'rgb(138,202,245)',
      opacity: 0.6,
    }
  }]

  this.licenceTypeLayout = {
    width: 400, height: 290, 
    title: 'OA License Types', 
    margin: {
      t: 40,
      r: 10, 
      b: 45, 
      l: 45
    }
  }

  const disciplinesModelsMap:stringStringNumberMap = this.dataService.generateDisciplinesMap();


  this.modelsDisciplinesData = [{
    x: Object.keys(disciplinesModelsMap),
    y: Object.values(disciplinesModelsMap).map(subjectObj => subjectObj["Open Choice"]),
    type: 'bar',
    name: 'Open Choice'
  },
  {
    x: Object.keys(disciplinesModelsMap),
    y: Object.values(disciplinesModelsMap).map(subjectObj => subjectObj["Fully Open Access"]),
    type: 'bar',
    name: 'Fully Open Access'
  },
  {
    x: Object.keys(disciplinesModelsMap),
    y: Object.values(disciplinesModelsMap).map(subjectObj => subjectObj["Subscription-only"]),
    type: 'bar',
    name: 'Subscription Only'
  },
  {
    x: Object.keys(disciplinesModelsMap),
    y: Object.values(disciplinesModelsMap).map(subjectObj => subjectObj["Hybrid (Third Party)"]),
    type: 'bar',
    name: 'Hybrid (Third Party)'
  }

]

  this.modelsDisciplinesLayout = {
    width: 400, height: 200,
    title: 'Publishing Models by Subjects', 
    margin: {
      t: 40,
      r: 10, 
      b: 45, 
      l: 45
    },
    barmode: 'stack'
  }

  this.charts[0] = new PieChart(this.chartLayout, this.chartData);
  this.charts[1] = new BarChart(this.chartLayout2, this.chartData2);
  this.charts[2] = new ScatterChart(this.chartLayout3, this.chartData3);
  this.charts[3] = new PieChart(this.donutLayout, this.donutChartData);
  this.charts[4] = new BarChart(this.licenceTypeLayout, this.licenceTypeData);
  this.charts[5] = new BarChart(this.modelsDisciplinesLayout, this.modelsDisciplinesData);

}

}


