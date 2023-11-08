import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoRecordSevenDaysTableComponent } from './dso-record-seven-days-table.component';

describe('DsoRecordSevenDaysTableComponent', () => {
  let component: DsoRecordSevenDaysTableComponent;
  let fixture: ComponentFixture<DsoRecordSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoRecordSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoRecordSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
