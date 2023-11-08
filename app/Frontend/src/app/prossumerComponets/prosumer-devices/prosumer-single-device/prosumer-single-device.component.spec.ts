import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerSingleDeviceComponent } from './prosumer-single-device.component';

describe('ProsumerSingleDeviceComponent', () => {
  let component: ProsumerSingleDeviceComponent;
  let fixture: ComponentFixture<ProsumerSingleDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerSingleDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerSingleDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
