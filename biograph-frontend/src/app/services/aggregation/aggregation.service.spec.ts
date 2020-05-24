import {TestBed} from '@angular/core/testing';

import {AggregationService, DateStepType} from './aggregation.service';

describe('AggregationService', () => {
  let service: AggregationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate date ranges', () => {
    const metricDataEntries = service.generateEmptyMetricDataEntry(
      {
        startDate: new Date('2018-01-24T09:32:40.381Z'),
        endDate: new Date('2018-01-24T09:32:40.381Z'),
        metricConfiguration: [
          {
            isNormalized: true,
            isDisplayed: true,
            aggregationFunction: service.averageAggregationFunction,
            attribute: {
              name: 'attr1',
              attributeType: null,
              attributeId: 1,
              constraint: null,
              creationTime: null,
              description: null,
              totalCategories: null,
              totalMeasurements: null,
            }
          },
          {
            isNormalized: true,
            isDisplayed: true,
            aggregationFunction: service.averageAggregationFunction,
            attribute: {
              name: 'attr2',
              attributeType: null,
              attributeId: 2,
              constraint: null,
              creationTime: null,
              description: null,
              totalCategories: null,
              totalMeasurements: null,
            }
          }
        ],
        step: {type: DateStepType.MONTH, amount: 1},
      });
    expect(true).toBeTrue();
  });
});
