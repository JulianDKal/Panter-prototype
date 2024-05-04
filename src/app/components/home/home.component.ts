import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}

  routeToPortfolio(){
    console.log("clicked");
    this.router.navigate(['../portfolio']);
  }
}
