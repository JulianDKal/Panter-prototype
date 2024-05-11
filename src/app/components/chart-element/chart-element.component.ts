import { Component, Input } from '@angular/core';
import { Chart } from '../../Chart';

@Component({
  selector: 'app-chart-element',
  standalone: true,
  imports: [],
  templateUrl: './chart-element.component.html',
  styleUrl: './chart-element.component.css'
})
export class ChartElementComponent {
  @Input() chart!:Chart;
  constructor(){
  }
}
