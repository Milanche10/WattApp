import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProssumerProducedSevenDaysTableComponent } from './prossumer-produced-seven-days-chart.component';

describe('ProssumerProducedSevenDaysTableComponent', () => {
  let component: ProssumerProducedSevenDaysTableComponent;
  let fixture: ComponentFixture<ProssumerProducedSevenDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProssumerProducedSevenDaysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProssumerProducedSevenDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
