import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceDetailsComponent } from './prosumer-device-details.component';

describe('ProsumerDeviceDetailsComponent', () => {
  let component: ProsumerDeviceDetailsComponent;
  let fixture: ComponentFixture<ProsumerDeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
