import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerDataComponent } from './prossumer-data.component';

describe('ProssumerDataComponent', () => {
  let component: ProssumerDataComponent;
  let fixture: ComponentFixture<ProssumerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
