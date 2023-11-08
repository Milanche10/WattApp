import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoAdminDashboardComponent } from './dso-admin-dashboard.component';
import { DsoMapComponent } from '../dso-map/dso-map.component';

describe('DsoAdminDashboardComponent', () => {
  let component: DsoAdminDashboardComponent;
  let fixture: ComponentFixture<DsoAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoAdminDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('MapComponent', () => {
  let component: DsoMapComponent;
  let fixture: ComponentFixture<DsoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
