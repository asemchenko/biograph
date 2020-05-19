import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MetricsMonitoringComponent} from './metrics-monitoring.component';

describe('MetricsMonitoringComponent', () => {
  let component: MetricsMonitoringComponent;
  let fixture: ComponentFixture<MetricsMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsMonitoringComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
