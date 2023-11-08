import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChartComponent } from './history-chart.component';

describe('HistoryChartComponent', () => {
  let component: HistoryChartComponent;
  let fixture: ComponentFixture<HistoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
