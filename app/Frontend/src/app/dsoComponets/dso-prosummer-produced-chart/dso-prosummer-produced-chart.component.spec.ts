import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProsummerProducedChartComponent } from './dso-prosummer-produced-chart.component';

describe('DsoProsummerProducedChartComponent', () => {
  let component: DsoProsummerProducedChartComponent;
  let fixture: ComponentFixture<DsoProsummerProducedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProsummerProducedChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProsummerProducedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
