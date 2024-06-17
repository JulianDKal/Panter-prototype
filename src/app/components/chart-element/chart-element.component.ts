import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from '../../Chart';
import * as Plotly from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chart-element',
  standalone: true,
  imports: [PlotlyModule, NgIf],
  template: '<plotly-plot *ngIf="isReady" [data]="chart.data" [layout]="chart.layout" [config]="{displayModeBar: false}"></plotly-plot>',
  styleUrl: './chart-element.component.css'
})
export class ChartElementComponent {
  @Input() chart!:Chart;
  isReady:boolean = false;

  constructor(private elRef: ElementRef){}
  configObj:any = {
    staticPlot: true
  }

  ngOnInit()
  {
    if(this.chart){
      console.log("the chart element was created! " + this.chart.layout.title);
      this.isReady = true;
    }
    //console.log(this.chart.data, this.chart.layout)
  }

  ngAfterViewInit()
  {
    if(this.isReady){
      const parent = this.elRef.nativeElement.parentElement;
    this.chart.layout.height = parent.clientHeight;
    this.chart.layout.width = parent.clientWidth;
    this.logParentDetails();
    }
    else console.log("I wasn't ready yet!");
    
    
  }

  private logParentDetails() {
    const parent = this.elRef.nativeElement.parentElement;
    if (parent) {
      const parentTagName = parent.tagName.toLowerCase(); // Get the tag name of the parent element
      const parentClasses = parent.className; // Get the CSS classes of the parent element

      console.log('Parent Tag Name:', parentTagName);
      console.log('Parent CSS Classes:', parentClasses);
    }
  }

}
