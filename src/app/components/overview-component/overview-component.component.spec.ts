import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponentComponent } from './overview-component.component';

describe('OverviewComponentComponent', () => {
  let component: OverviewComponentComponent;
  let fixture: ComponentFixture<OverviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
