import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoHomeComponent } from './dso-home.component';

describe('DsoHomeComponent', () => {
  let component: DsoHomeComponent;
  let fixture: ComponentFixture<DsoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
