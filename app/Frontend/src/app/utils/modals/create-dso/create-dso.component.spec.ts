import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDsoComponent } from './create-dso.component';

describe('CreateDsoComponent', () => {
  let component: CreateDsoComponent;
  let fixture: ComponentFixture<CreateDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
