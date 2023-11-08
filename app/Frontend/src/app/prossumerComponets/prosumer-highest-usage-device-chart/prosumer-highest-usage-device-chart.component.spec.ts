import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerHighestUsageDeviceChartComponent } from './prosumer-highest-usage-device-chart.component';

describe('ProsumerHighestUsageDeviceChartComponent', () => {
  let component: ProsumerHighestUsageDeviceChartComponent;
  let fixture: ComponentFixture<ProsumerHighestUsageDeviceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerHighestUsageDeviceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerHighestUsageDeviceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
