import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerEditProfileComponent } from './prossumer-edit-profile.component';

describe('ProssumerEditProfileComponent', () => {
  let component: ProssumerEditProfileComponent;
  let fixture: ComponentFixture<ProssumerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
