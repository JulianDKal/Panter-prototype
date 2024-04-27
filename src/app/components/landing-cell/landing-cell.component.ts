import { Component, Input } from '@angular/core';
import { BarchartComponent } from '../barchart/barchart.component';

@Component({
  selector: 'app-landing-cell',
  standalone: true,
  imports: [BarchartComponent],
  templateUrl: './landing-cell.component.html',
  styleUrl: './landing-cell.component.css'
})
export class LandingCellComponent {
  @Input() inputChart!: string;

  typeOfChart: string = 'bar';
}
