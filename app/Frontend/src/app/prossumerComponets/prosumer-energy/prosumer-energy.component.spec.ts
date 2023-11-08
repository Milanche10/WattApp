import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerEnergyComponent } from './prosumer-energy.component';

describe('ProsumerEnergyComponent', () => {
  let component: ProsumerEnergyComponent;
  let fixture: ComponentFixture<ProsumerEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerEnergyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
