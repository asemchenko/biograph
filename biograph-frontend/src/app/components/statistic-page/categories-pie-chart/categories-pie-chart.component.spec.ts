import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoriesPieChartComponent} from './categories-pie-chart.component';

describe('CategoriesPieChartComponent', () => {
  let component: CategoriesPieChartComponent;
  let fixture: ComponentFixture<CategoriesPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesPieChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
