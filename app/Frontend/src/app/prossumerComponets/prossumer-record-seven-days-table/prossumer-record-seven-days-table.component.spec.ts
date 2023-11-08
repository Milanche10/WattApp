import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerRecordSevenDaysTableComponent } from './prossumer-record-seven-days-table.component';

describe('ProssumerRecordSevenDaysTableComponent', () => {
  let component: ProssumerRecordSevenDaysTableComponent;
  let fixture: ComponentFixture<ProssumerRecordSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerRecordSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerRecordSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
