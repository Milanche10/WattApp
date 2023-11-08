import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProducedChartComponent } from './dso-produced-chart.component';

describe('DsoProducedChartComponent', () => {
  let component: DsoProducedChartComponent;
  let fixture: ComponentFixture<DsoProducedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProducedChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProducedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
