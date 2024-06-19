import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../Chart';
import { ChartElementComponent } from '../chart-element/chart-element.component';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-graph-container',
  standalone: true,
  imports: [ChartElementComponent, NgFor, NgClass],
  templateUrl: './graph-container.component.html',
  styleUrl: './graph-container.component.css'
})

export class GraphContainerComponent {

  @Input() inputCharts!:Chart[];
  @Input() inputTitles!:string[];
  
  chartForGraph!:Chart;
  
  buttonList:btn[] = [];

  ngOnInit(){
    this.chartForGraph = this.inputCharts[0];
    for (let i = 0; i < this.inputTitles.length ; i++) 
    {
      this.buttonList[i] = {title: this.inputTitles[i], active: false, chart: this.inputCharts[i]};
    }

    if(this.inputTitles.length != 0) {
      this.buttonList[0].active = true;
      this.chartForGraph = this.inputCharts[0];
    }
  }

  setActive(index: number) {
    this.buttonList.forEach((btn, i) => {
      if(i === index) {
        btn.active = true;
        this.chartForGraph = this.inputCharts[i];
      }
      else btn.active = false;
    })
  }

}

type btn = {
  title: string,
  active: boolean,
  chart?: Chart
}
