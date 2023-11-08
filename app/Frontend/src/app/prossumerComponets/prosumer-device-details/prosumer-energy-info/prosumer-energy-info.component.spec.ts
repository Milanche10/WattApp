import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerEnergyInfoComponent } from './prosumer-energy-info.component';

describe('ProsumerEnergyInfoComponent', () => {
  let component: ProsumerEnergyInfoComponent;
  let fixture: ComponentFixture<ProsumerEnergyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerEnergyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerEnergyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
