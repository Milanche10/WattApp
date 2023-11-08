import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerHomeComponent } from './prossumer-home.component';

describe('ProssumerHomeComponent', () => {
  let component: ProssumerHomeComponent;
  let fixture: ComponentFixture<ProssumerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
