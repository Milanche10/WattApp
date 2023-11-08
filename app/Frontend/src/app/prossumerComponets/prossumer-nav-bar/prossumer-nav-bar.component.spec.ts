import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerNavBarComponent } from './prossumer-nav-bar.component';

describe('ProssumerNavBarComponent', () => {
  let component: ProssumerNavBarComponent;
  let fixture: ComponentFixture<ProssumerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
