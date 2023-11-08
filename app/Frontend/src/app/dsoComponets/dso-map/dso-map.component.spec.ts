import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoMapComponent } from './dso-map.component';


describe('DsoMapComponent', () => {
  let component: DsoMapComponent;
  let fixture: ComponentFixture<DsoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
