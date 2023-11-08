import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoLabelComponent } from './dso-label.component';

describe('DsoLabelComponent', () => {
  let component: DsoLabelComponent;
  let fixture: ComponentFixture<DsoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
