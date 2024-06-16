import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartElementComponent } from './chart-element.component';

describe('ChartElementComponent', () => {
  let component: ChartElementComponent;
  let fixture: ComponentFixture<ChartElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
