import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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

  constructor(private elRef: ElementRef){}

  ngOnInit()
  {
    console.log("the chart element was created! " + this.chart.layout.title);
    //console.log(this.chart.data, this.chart.layout)
  }

  ngAfterViewInit()
  {
    const parent = this.elRef.nativeElement.parentElement;
    this.chart.layout.height = parent.clientHeight;
    this.chart.layout.width = parent.clientWidth;
  }
}
