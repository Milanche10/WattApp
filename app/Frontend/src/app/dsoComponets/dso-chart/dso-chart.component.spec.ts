import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoChartComponent } from './dso-chart.component';

describe('DsoChartComponent', () => {
  let component: DsoChartComponent;
  let fixture: ComponentFixture<DsoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
