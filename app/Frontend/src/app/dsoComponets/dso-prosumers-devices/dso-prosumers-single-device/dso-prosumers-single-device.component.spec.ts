import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProsumersSingleDeviceComponent } from './dso-prosumers-single-device.component';

describe('DsoProsumersSingleDeviceComponent', () => {
  let component: DsoProsumersSingleDeviceComponent;
  let fixture: ComponentFixture<DsoProsumersSingleDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProsumersSingleDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProsumersSingleDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
