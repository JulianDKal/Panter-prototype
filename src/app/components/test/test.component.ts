import { Component, Input, OnInit } from '@angular/core';

import * as Plotly from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [PlotlyModule],
  //templateUrl: './test.component.html',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout" ></plotly-plot>',
  styleUrl: './test.component.css'
})
export class TestComponent {
  @Input() chartType: string = '';
  
  public graph = {
    data: [
        //{ x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'lightblue'} },
        { x: [1, 2, 3], 
          y: [2, 5, 3], 
          type: 'scatter' , 
          marker: {color: 'lightblue'} 
        },
    ],
    layout: {width: 520, height: 290, title: 'A Fancy Plot'}
    
};

ngOnInit(){
  console.log(this.chartType);
  this.graph.data =  [
    //{ x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'lightblue'} },
    { x: [1, 2, 3], 
      y: [2, 5, 3], 
      type: this.chartType , 
      marker: {color: 'lightblue'} 
    },
]
}

  
}

