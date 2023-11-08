import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerEditDataComponent } from './prossumer-edit-data.component';

describe('ProssumerEditDataComponent', () => {
  let component: ProssumerEditDataComponent;
  let fixture: ComponentFixture<ProssumerEditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerEditDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
