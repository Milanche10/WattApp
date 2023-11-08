import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceProductionChartComponent } from './prosumer-device-production-chart.component';

describe('ProsumerDeviceProductionChartComponent', () => {
  let component: ProsumerDeviceProductionChartComponent;
  let fixture: ComponentFixture<ProsumerDeviceProductionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceProductionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceProductionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
