import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerHistoryTableComponent } from './prossumer-history-table.component';

describe('ProssumerHistoryTableComponent', () => {
  let component: ProssumerHistoryTableComponent;
  let fixture: ComponentFixture<ProssumerHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
