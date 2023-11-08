import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssummerSingleDataComponent } from './prossummer-single-data.component';

describe('ProssummerSingleDataComponent', () => {
  let component: ProssummerSingleDataComponent;
  let fixture: ComponentFixture<ProssummerSingleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssummerSingleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssummerSingleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
