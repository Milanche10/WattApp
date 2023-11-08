import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProsumersDevicesComponent } from './dso-prosumers-devices.component';

describe('DsoProsumersDevicesComponent', () => {
  let component: DsoProsumersDevicesComponent;
  let fixture: ComponentFixture<DsoProsumersDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProsumersDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProsumersDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
