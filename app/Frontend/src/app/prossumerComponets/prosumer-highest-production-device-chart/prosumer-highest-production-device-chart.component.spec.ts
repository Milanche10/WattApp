import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerHighestProductionDeviceChartComponent } from './prosumer-highest-production-device-chart.component';

describe('ProsumerHighestProductionDeviceChartComponent', () => {
  let component: ProsumerHighestProductionDeviceChartComponent;
  let fixture: ComponentFixture<ProsumerHighestProductionDeviceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerHighestProductionDeviceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerHighestProductionDeviceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
