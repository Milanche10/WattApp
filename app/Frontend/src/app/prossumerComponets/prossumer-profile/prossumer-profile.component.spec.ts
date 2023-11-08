import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerProfileComponent } from './prossumer-profile.component';

describe('ProssumerProfileComponent', () => {
  let component: ProssumerProfileComponent;
  let fixture: ComponentFixture<ProssumerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
