import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerUsageSevenDaysTableComponent } from './prossumer-usage-seven-days-chart.component';

describe('ProssumerUsageSevenDaysTableComponent', () => {
  let component: ProssumerUsageSevenDaysTableComponent;
  let fixture: ComponentFixture<ProssumerUsageSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerUsageSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerUsageSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
