import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from '../../Chart';
import * as Plotly from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-chart-element',
  standalone: true,
  imports: [PlotlyModule],
  template: '<plotly-plot [data]="chart.data" [layout]="chart.layout"></plotly-plot>',
  styleUrl: './chart-element.component.css'
})
export class ChartElementComponent {
  @Input() chart!:Chart;

  ngOnInit()
  {
    console.log("the chart element was created! " + this.chart.layout.title);
    //console.log(this.chart.data, this.chart.layout)
  }

  ngAfterViewInit()
  {
    
  }
}
