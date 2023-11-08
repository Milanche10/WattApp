import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoProsumersTable } from './dso-prosumers-table.component';


describe('DsoProsumersTable ', () => {
  let component: DsoProsumersTable ;
  let fixture: ComponentFixture<DsoProsumersTable >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoProsumersTable  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoProsumersTable );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



