import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoPredictionSevenDaysTableComponent } from './dso-prediction-seven-days-table.component';

describe('DsoPredictionSevenDaysTableComponent', () => {
  let component: DsoPredictionSevenDaysTableComponent;
  let fixture: ComponentFixture<DsoPredictionSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoPredictionSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoPredictionSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
