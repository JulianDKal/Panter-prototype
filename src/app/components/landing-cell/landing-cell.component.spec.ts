import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCellComponent } from './landing-cell.component';

describe('LandingCellComponent', () => {
  let component: LandingCellComponent;
  let fixture: ComponentFixture<LandingCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
