import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceProducedChartComponent } from './prosumer-device-produced-chart.component';

describe('ProsumerDeviceProducedChartComponent', () => {
  let component: ProsumerDeviceProducedChartComponent;
  let fixture: ComponentFixture<ProsumerDeviceProducedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceProducedChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceProducedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
