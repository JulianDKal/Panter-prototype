import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from '../../Chart';
import * as Plotly from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-chart-element',
  standalone: true,
  imports: [PlotlyModule],
  template: '<plotly-plot [data]="chart.data" [layout]="chart.layout" ></plotly-plot>',
  styleUrl: './chart-element.component.css'
})
export class ChartElementComponent {
  @Input() chart!:Chart;
  @Input() chartType: string = '';

  ngOnInit()
  {
    console.log("the chart element was created! " + this.chart.layout.title);
    //TO-DO: das dynamisch machen falls mehrere Plots in einem Diagramm vorkommen
    this.chart.data[0].type = this.chartType;
    //console.log(this.chart.data, this.chart.layout)
  }

  ngAfterViewInit()
  {

  }
}
