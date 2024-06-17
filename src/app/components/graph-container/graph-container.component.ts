import { Component, Input } from '@angular/core';
import { Chart } from '../../Chart';
import { ChartElementComponent } from '../chart-element/chart-element.component';

@Component({
  selector: 'app-graph-container',
  standalone: true,
  imports: [ChartElementComponent],
  templateUrl: './graph-container.component.html',
  styleUrl: './graph-container.component.css'
})
export class GraphContainerComponent {
  @Input() chartForGraph!:Chart;


}
