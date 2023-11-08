import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerAllDevicesComponent } from './prossumer-all-devices.component';

describe('ProssumerAllDevicesComponent', () => {
  let component: ProssumerAllDevicesComponent;
  let fixture: ComponentFixture<ProssumerAllDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerAllDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerAllDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
