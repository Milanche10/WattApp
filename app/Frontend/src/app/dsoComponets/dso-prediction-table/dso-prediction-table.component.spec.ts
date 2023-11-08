import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoPredictionTableComponent } from './dso-prediction-table.component';

describe('DsoPredictionTableComponent', () => {
  let component: DsoPredictionTableComponent;
  let fixture: ComponentFixture<DsoPredictionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoPredictionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoPredictionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
