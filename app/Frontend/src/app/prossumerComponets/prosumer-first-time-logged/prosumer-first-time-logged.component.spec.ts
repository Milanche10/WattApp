import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerFirstTimeLoggedComponent } from './prosumer-first-time-logged.component';

describe('ProsumerFirstTimeLoggedComponent', () => {
  let component: ProsumerFirstTimeLoggedComponent;
  let fixture: ComponentFixture<ProsumerFirstTimeLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerFirstTimeLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerFirstTimeLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
