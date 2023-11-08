import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerPredictionSevenDaysTableComponent } from './prossumer-prediction-seven-days-table.component';

describe('ProssumerPredictionSevenDaysTableComponent', () => {
  let component: ProssumerPredictionSevenDaysTableComponent;
  let fixture: ComponentFixture<ProssumerPredictionSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerPredictionSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerPredictionSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
