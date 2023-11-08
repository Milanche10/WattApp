import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerHistoryChartComponent } from './prosumer-history-chart.component';

describe('ProsumerHistoryChartComponent', () => {
  let component: ProsumerHistoryChartComponent;
  let fixture: ComponentFixture<ProsumerHistoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerHistoryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerHistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
