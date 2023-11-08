import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerSevenDaysChartComponent } from './prosumer-seven-days-chart.component';

describe('ProsumerSevenDaysChartComponent', () => {
  let component: ProsumerSevenDaysChartComponent;
  let fixture: ComponentFixture<ProsumerSevenDaysChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerSevenDaysChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerSevenDaysChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
