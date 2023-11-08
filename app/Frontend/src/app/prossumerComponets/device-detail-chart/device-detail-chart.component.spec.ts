import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailChartComponent } from './device-detail-chart.component';

describe('DeviceDetailChartComponent', () => {
  let component: DeviceDetailChartComponent;
  let fixture: ComponentFixture<DeviceDetailChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDetailChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceDetailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
