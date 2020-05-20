import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventGroupPieChartComponent} from './event-group-pie-chart.component';

describe('CategoriesPieChartComponent', () => {
  let component: EventGroupPieChartComponent;
  let fixture: ComponentFixture<EventGroupPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventGroupPieChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
