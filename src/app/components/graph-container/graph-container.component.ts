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
  @Input() inputChart!:Chart;

  @Input() inputTitles!:string[];
  
  chartForGraph!:Chart;
  
  buttonList:btn[] = [];

  ngOnInit(){
    this.chartForGraph = this.inputChart;
    for (let i = 0; i < this.inputTitles.length ; i++) 
    {
      this.buttonList[i] = {title: this.inputTitles[i], active: false};
    }

    if(this.inputTitles.length != 0) this.buttonList[0].active = true;
  }

  setActive(index: number) {
    this.buttonList.forEach((btn, i) => {
      if(i === index) btn.active = true;
      else btn.active = false;
    })
  }

}

type btn = {
  title: string,
  active: boolean,
  chart?: Chart
}
