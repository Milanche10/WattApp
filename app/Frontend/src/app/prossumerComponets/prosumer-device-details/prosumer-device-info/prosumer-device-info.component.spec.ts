import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceInfoComponent } from './prosumer-device-info.component';

describe('ProsumerDeviceInfoComponent', () => {
  let component: ProsumerDeviceInfoComponent;
  let fixture: ComponentFixture<ProsumerDeviceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
