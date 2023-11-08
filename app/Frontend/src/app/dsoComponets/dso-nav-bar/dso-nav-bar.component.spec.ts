import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoNavBarComponent } from './dso-nav-bar.component';

describe('DsoNavBarComponent', () => {
  let component: DsoNavBarComponent;
  let fixture: ComponentFixture<DsoNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
