import { Component, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { BarChart, BoxPlot, Chart, PieChart, ScatterChart } from '../../Chart';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { OverviewComponentComponent } from '../overview-component/overview-component.component';
import { BoxPlotData } from 'plotly.js';

enum Pages {
  SpringerNaturePage = 0,
  WileyPage,
  BothPage
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent,ChartElementComponent, GraphContainerComponent, NgIf, OverviewComponentComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  Pages = Pages;
  currentPage:Pages = Pages.SpringerNaturePage;

  //Teil, in dem die Daten geholt werden
  private dataReadySubscription: Subscription | null = null;
  
  charts:Chart[] = [];
  
  //----------------------------------------------
  //Springer Charts
  chartData!:pieData[];
  chartLayout!:plotLayout;
  
  chartData2!:barData[];
  chartLayout2!:plotLayout;

  chartData3!:scatterData[];
  chartLayout3!:plotLayout;

  models23Data!:pieData[];
  models23Layout!:plotLayout;

  sPricesByYearsData!:barData[];
  sPricesbyYearsLayout!:plotLayout;

  licenceTypeData!:barData[];
  licenceTypeLayout!:plotLayout;

  modelsDisciplinesData!:barData[];
  modelsDisciplinesLayout!:plotLayout;


  //--------------------------------------------
  //Wiley Charts
  wileyMainDisciplData!:pieData[];
  wileyMainDisciplLayout!:plotLayout;

  wileyAveragePricesData!:barData[]; //Preise über dieses Jahr
  wileyAveragePricesLayout!:plotLayout;

  wileyDisciplinePricesData!:barData[];
  wileyDisciplinesPricesLayout!:plotLayout;

  wileyLicensesData!:barData[];
  wileyLicenesLayout!:plotLayout;

  wileyLicensesSectionsData!:barData[];
  wileyLicensesSectionsLayout!:plotLayout;

  wileyPublishingModel23Data!:pieData[];
  wileyPublishingModel23Layout!:plotLayout;

  wileyPublishingModelsSectionsData!:barData[];
  wileyPublishingModelsSectionsLayout!:plotLayout;

  //All charts
  pricesComparedYears!:scatterData[];
  pricesComparedYearsLayout!:plotLayout;

  modelsCompared!:barData[];
  modelsComparedLayout!:plotLayout;

  boxplotPrices!:boxData[];
  boxplotPricesLayout!:plotLayout;
  
  overviewChart!:pieData[];
  overViewChartLayout!:plotLayout;
  
  constructor(private dataService:DataService) { }
  
  isLoading:boolean = true;

  ngOnInit()
  {
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
  const mainDisciplines:CountMap = this.dataService.countOccurrences(this.dataService.mainDisciplines, 100);

  this.chartData = [{
    labels: Object.keys(mainDisciplines),
    values: Object.values(mainDisciplines),
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

  const publishingModels19Map = this.dataService.countOccurrences(this.dataService.publishingModels19, 2);
  const publishingModels20Map = this.dataService.countOccurrences(this.dataService.publishingModels20, 2);
  const publishingModels22Map = this.dataService.countOccurrences(this.dataService.publishingModels22, 2);
  const publishingModels23Map = this.dataService.countOccurrences(this.dataService.publishingModels23, 2);

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

  const models23Map = this.dataService.countOccurrences(this.dataService.publishingModels23, 2);

  this.models23Data = [{
    labels: Object.keys(models23Map),
    values: Object.values(models23Map),
    type: 'pie'
  }]

  this.models23Layout = {
    width: 400, height: 290, title: '', margin: {
      t: 40,
      r: 60, 
      b: 10, 
      l: 10  
    }
  }

  const avgPrices2019 = this.dataService.getAvgPrice(this.dataService.apcPrices)
  const avgPrices2020 = this.dataService.getAvgPrice(this.dataService.apcPrices20)
  const avgPrices2022 = this.dataService.getAvgPrice(this.dataService.apcPrices22)
  const avgPrices2023 = this.dataService.getAvgPrice(this.dataService.apcPrices23)

  const years = ["2019", "2020", "2021", "2022", "2023"]
  const avgPrices = [avgPrices2019, avgPrices2020, 1750, avgPrices2022, avgPrices2023]

  this.sPricesByYearsData = [{
    x: years,
    y: avgPrices,
    type: 'bar',
    marker: {
      color: 'rgb(138,202,245)',
      opacity: 0.6,
    }
  }]

  this.sPricesbyYearsLayout = {
    width: 400, height: 290, 
    title: 'Average APC Prices', 
    margin: {
      t: 40,
      r: 10, 
      b: 45, 
      l: 45
    },
    xaxis: {
      dtick: 1
    }
  }

  const licenseTypesMap = this.dataService.countOccurrences(this.dataService.licenseTypes19, 0);
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

  const disciplinesModelsMap:stringStringNumberMap = this.dataService.generateDisciplinesMap(this.dataService.mainDisciplines23, this.dataService.publishingModels23, 120);


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

  const wileyMainDisciplines = this.dataService.countOccurrences(this.dataService.wMainDisciplines23, 50);
  this.wileyMainDisciplData = [{
    labels: Object.keys(wileyMainDisciplines),
    values: Object.values(wileyMainDisciplines),
    type: 'pie'
  }]

  this.wileyMainDisciplLayout = {
    width: 400, height: 290, title: 'Main Disciplines Wiley Deal', margin: {
      t: 40,
      r: 10, 
      b: 10, 
      l: 10  
    }
  }

  const WavgPrices2020 = this.dataService.getAvgPrice(this.dataService.wileyAPCs2020);
  const WavgPrices2021 = this.dataService.getAvgPrice(this.dataService.wileyAPCs2021);
  const WavgPrices2022 = this.dataService.getAvgPrice(this.dataService.wileyAPCs2022);
  const WavgPrices2023 = this.dataService.getAvgPrice(this.dataService.wileyAPCs2023);
  const WavgPrices = [1600, WavgPrices2020, WavgPrices2021, WavgPrices2022, WavgPrices2023]
  const wYears = ["2019", "2020", "2021", "2022", "2023"]

  this.wileyAveragePricesData = [{
    x: wYears,
    y: WavgPrices,
    type: 'bar',
    marker: {
      color: 'rgb(138,202,245)',
      opacity: 0.6,
    }
  }]
  this.wileyAveragePricesLayout = this.sPricesbyYearsLayout


  const disciplinesCombined = this.dataService.mainDisciplines23.concat(this.dataService.wMainDisciplines23)
  const newMainDisc:CountMap = this.dataService.countOccurrences(disciplinesCombined, 25);

  this.overviewChart = [{
    labels: Object.keys(newMainDisc),
    values: Object.values(newMainDisc),
    type: 'pie',
    hole: 0.55
  }]

  this.overViewChartLayout = {
    width: 400, height: 290, title: 'Main Disciplines', margin: {
      t: 40,
      r: 10, 
      b: 10, 
      l: 10  
    },
    showlegend: false
  }

  const wileyDisciplinePricemap = this.dataService.generateAvgPriceMap(this.dataService.wMainDisciplines23, this.dataService.wileyAPCs2023);

  this.wileyDisciplinePricesData = [{
    x: Object.keys(wileyDisciplinePricemap),
    y: Object.values(wileyDisciplinePricemap),
    type: 'bar',
    marker: {
      color: 'rgb(138,202,245)',
      opacity: 0.6,
    }
  }]

  this.wileyDisciplinesPricesLayout = {
    width: 400, height: 290, 
    title: 'APC Prices by Sections', 
    margin: {
      t: 40,
      r: 40, 
      b: 70, 
      l: 45
    },
    xaxis: {
      tickfont: {
        size: 9
      }
    }
  }

  const wileyLicenseData = this.dataService.countOccurrences(this.dataService.wileyLicenses23, 50);
  delete wileyLicenseData["undefined"];
  delete wileyLicenseData["CC-BY-NC"]
  delete wileyLicenseData["CC-BY exceptions"]

  this.wileyLicensesData = [{
    x: Object.keys(wileyLicenseData),
    y: Object.values(wileyLicenseData),
    type: 'bar',
    marker: {
      color: 'rgb(138,202,245)',
      opacity: 0.6,
    }
  }]

  this.wileyLicenesLayout = {
    width: 400, height: 290, title: 'OA Lizenztypen', 
    margin: {
      t: 30,
      r: 10, 
      b: 80, 
      l: 45
    }
  }

  const wileyPublishingModels23Map = this.dataService.countOccurrences(this.dataService.wPublishingModels23, 50);

  this.wileyPublishingModel23Data = [{
    labels: Object.keys(wileyPublishingModels23Map),
    values: Object.values(wileyPublishingModels23Map),
    type: 'pie'
  }]

  this.wileyPublishingModel23Layout = {
    width: 400, height: 290, title: 'Veröffentlichungstypen', margin: {
      t: 40,
      r: 10, 
      b: 10, 
      l: 10  
    }
  }

  const wModelsSectionMap = this.dataService.generateDisciplinesMap(this.dataService.wMainDisciplines23, this.dataService.wPublishingModels23, 40);

  this.wileyPublishingModelsSectionsData = [{
    x: Object.keys(wModelsSectionMap),
    y: Object.values(wModelsSectionMap).map(subjectObj => subjectObj["OA"]),
    type: 'bar',
    name: 'Open Access'
  },
  {
    x: Object.keys(wModelsSectionMap),
    y: Object.values(wModelsSectionMap).map(subjectObj => subjectObj["HOA"]),
    type: 'bar',
    name: 'Hybrid OA'
  },
  {
    x: Object.keys(wModelsSectionMap),
    y: Object.values(wModelsSectionMap).map(subjectObj => subjectObj["SUBS"]),
    type: 'bar',
    name: 'Subscription'
  }
]

  this.wileyPublishingModelsSectionsLayout = {
    width: 400, height: 200, title: 'Publishing Modell nach Themengebiet', 
    margin: {
      t: 40,
      r: 10, 
      b: 45, 
      l: 45
    }, barmode: 'stack' }

    const wLicensesSectionsMap = this.dataService.generateDisciplinesMap(this.dataService.wMainDisciplines23, this.dataService.wileyLicenses23, 30);

    this.wileyLicensesSectionsData = [{
      x: Object.keys(wLicensesSectionsMap),
      y: Object.values(wLicensesSectionsMap).map(subjectObj => subjectObj["CC-BY for all"]),
      type: 'bar',
      name: 'CC-BY for all'
    },
    {
      x: Object.keys(wLicensesSectionsMap),
      y: Object.values(wLicensesSectionsMap).map(subjectObj => subjectObj["TBD"]),
      type: 'bar',
      name: 'TBD'
    },
    {
      x: Object.keys(wLicensesSectionsMap),
      y: Object.values(wLicensesSectionsMap).map(subjectObj => subjectObj["CC-BY by mandate only"]),
      type: 'bar',
      name: 'CC-BY by mandate'
    },
    {
      x: Object.keys(wLicensesSectionsMap),
      y: Object.values(wLicensesSectionsMap).map(subjectObj => subjectObj["CC-BY only"]),
      type: 'bar',
      name: 'CC-BY only'
    },
    {
      x: Object.keys(wLicensesSectionsMap),
      y: Object.values(wLicensesSectionsMap).map(subjectObj => subjectObj["CTA"]),
      type: 'bar',
      name: 'CTA'
    }
  
  ]

    this.wileyLicensesSectionsLayout = {
      width: 400, height: 200, title: 'Lizenztypen nach Themengebiet', 
      margin: {
        t: 40,
        r: 10, 
        b: 45, 
        l: 45
      }, barmode: 'stack' }

  this.pricesComparedYears = [{
    x: years,
    y: avgPrices,
    type: 'scatter',
    name: 'Springer',
    fill: 'tozeroy'
  },
  {
    x: wYears,
    y: WavgPrices,
    type: 'scatter',
    name: 'Wiley',
    fill: 'tonexty'
  }
]

  this.pricesComparedYearsLayout = {
    width: 400, height: 290, title: '', 
    margin: {
      t: 70,
      r: 10, 
      b: 30, 
      l: 45  
    },
    xaxis: {
      tickangle: 0,
      dtick: 1
    }
  }
    

  const sPriceArr:number[] = this.dataService.convertToNumbers(this.dataService.apcPrices23);
  const wPriceArr:number[] = this.dataService.convertToNumbers(this.dataService.wileyAPCs2023);

  this.boxplotPrices = [{
    x: sPriceArr,
    type: 'box',
    name: 'Springer',
    orientation: 'h'
  },
  {
    x: wPriceArr,
    type: 'box',
    name: 'Wiley',
    orientation: 'h'
  }]

  this.boxplotPricesLayout = {
    width: 400, height: 290, title: 'APC Preise', 
    margin: {
      t: 40,
      r: 10, 
      b: 30, 
      l: 80  
    }
  }

  const modelLabels = ["Open Choice", "Open Access", "Subscription", "Hybrid (Third Party)"]

  this.modelsCompared = [{
    x: modelLabels,
    y: Object.values(models23Map),
    type: 'bar',
    name: 'Springer'
  },
  {
    x: modelLabels,
    y: Object.values(wileyPublishingModels23Map),
    type: 'bar',
    name: 'Wiley'
  }]

  this.modelsComparedLayout = {
    title: '',
    margin: {t: 40, r: 10, b: 30, l: 80  }
  }
  
  //sn deal charts
  this.charts[0] = new PieChart(this.chartLayout, this.chartData);
  this.charts[1] = new BarChart(this.chartLayout2, this.chartData2);
  this.charts[2] = new ScatterChart(this.chartLayout3, this.chartData3);
  this.charts[3] = new BarChart(this.sPricesbyYearsLayout, this.sPricesByYearsData);
  this.charts[4] = new BarChart(this.licenceTypeLayout, this.licenceTypeData);
  this.charts[5] = new BarChart(this.modelsDisciplinesLayout, this.modelsDisciplinesData);
  this.charts[16] = new PieChart(this.models23Layout, this.models23Data)

  //wiley deal charts
  this.charts[6] = new PieChart(this.wileyMainDisciplLayout, this.wileyMainDisciplData);
  this.charts[7] = new BarChart(this.wileyAveragePricesLayout, this.wileyAveragePricesData);
  this.charts[9] = new BarChart(this.wileyDisciplinesPricesLayout, this.wileyDisciplinePricesData);
  this.charts[10] = new BarChart(this.wileyLicenesLayout, this.wileyLicensesData);
  this.charts[11] = new PieChart(this.wileyPublishingModel23Layout, this.wileyPublishingModel23Data);
  this.charts[12] = new BarChart(this.wileyPublishingModelsSectionsLayout, this.wileyPublishingModelsSectionsData);
  this.charts[13] = new BarChart(this.wileyLicensesSectionsLayout, this.wileyLicensesSectionsData)
  
  //all charts
  this.charts[14] = new ScatterChart(this.pricesComparedYearsLayout, this.pricesComparedYears)
  this.charts[15] = new BoxPlot(this.boxplotPricesLayout, this.boxplotPrices)
  this.charts[17] = new BarChart(this.modelsComparedLayout, this.modelsCompared)
  
  this.charts[8] = new PieChart(this.overViewChartLayout, this.overviewChart);
}

  togglePage(){
    if(this.currentPage == Pages.SpringerNaturePage) this.currentPage = Pages.WileyPage
    else this.currentPage = Pages.SpringerNaturePage
  }

  bothPage(){
    if(this.currentPage != Pages.BothPage) this.currentPage = Pages.BothPage;
    else this.currentPage = Pages.SpringerNaturePage;
  }

}


