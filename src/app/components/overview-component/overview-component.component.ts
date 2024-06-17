import { Component,Input } from '@angular/core';
import { Chart } from '../../Chart';
import { ChartElementComponent } from '../chart-element/chart-element.component';

@Component({
  selector: 'app-overview-component',
  standalone: true,
  imports: [ChartElementComponent],
  templateUrl: './overview-component.component.html',
  styleUrl: './overview-component.component.css'
})
export class OverviewComponentComponent {
@Input() chartForGraph!:Chart;

}
