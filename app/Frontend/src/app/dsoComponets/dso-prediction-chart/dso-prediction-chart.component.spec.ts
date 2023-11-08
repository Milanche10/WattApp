import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoPredictionChartComponent } from './dso-prediction-chart.component';

describe('DsoPredictionChartComponent', () => {
  let component: DsoPredictionChartComponent;
  let fixture: ComponentFixture<DsoPredictionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoPredictionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoPredictionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
