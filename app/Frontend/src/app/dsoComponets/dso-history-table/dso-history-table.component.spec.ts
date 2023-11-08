import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoHistoryTableComponent } from './dso-history-table.component';

describe('DsoHistoryTableComponent', () => {
  let component: DsoHistoryTableComponent;
  let fixture: ComponentFixture<DsoHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
