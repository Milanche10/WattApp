import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoDeviceUsageChartComponent } from './dso-device-usage-chart.component';

describe('DsoDeviceUsageChartComponent', () => {
  let component: DsoDeviceUsageChartComponent;
  let fixture: ComponentFixture<DsoDeviceUsageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoDeviceUsageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoDeviceUsageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
