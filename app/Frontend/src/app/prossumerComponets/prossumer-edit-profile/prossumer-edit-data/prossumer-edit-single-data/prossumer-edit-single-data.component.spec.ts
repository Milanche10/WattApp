import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerEditSingleDataComponent } from './prossumer-edit-single-data.component';

describe('ProssumerEditSingleDataComponent', () => {
  let component: ProssumerEditSingleDataComponent;
  let fixture: ComponentFixture<ProssumerEditSingleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerEditSingleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerEditSingleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
