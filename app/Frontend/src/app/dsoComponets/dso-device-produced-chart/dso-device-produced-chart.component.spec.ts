import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoDeviceProducedChartComponent } from './dso-device-produced-chart.component';

describe('DsoDeviceProducedChartComponent', () => {
  let component: DsoDeviceProducedChartComponent;
  let fixture: ComponentFixture<DsoDeviceProducedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoDeviceProducedChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoDeviceProducedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
