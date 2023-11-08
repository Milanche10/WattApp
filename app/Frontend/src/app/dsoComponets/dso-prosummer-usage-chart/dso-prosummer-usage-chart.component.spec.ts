import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProsummerUsageChartComponent } from './dso-prosummer-usage-chart.component';

describe('DsoProsummerUsageChartComponent', () => {
  let component: DsoProsummerUsageChartComponent;
  let fixture: ComponentFixture<DsoProsummerUsageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProsummerUsageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProsummerUsageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
