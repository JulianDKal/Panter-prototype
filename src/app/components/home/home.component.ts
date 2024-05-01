import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
