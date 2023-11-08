import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceUsageChartComponent } from './prosumer-device-usage-chart.component';

describe('ProsumerDeviceUsageChartComponent', () => {
  let component: ProsumerDeviceUsageChartComponent;
  let fixture: ComponentFixture<ProsumerDeviceUsageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceUsageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceUsageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
