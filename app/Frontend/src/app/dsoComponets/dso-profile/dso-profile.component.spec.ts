import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProfileComponent } from './dso-profile.component';
import { HttpClientModule } from '@angular/common/http';

describe('DsoProfileComponent', () => {
  let component: DsoProfileComponent;
  let fixture: ComponentFixture<DsoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
