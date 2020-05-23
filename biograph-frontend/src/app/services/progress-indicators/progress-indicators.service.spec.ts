import {TestBed} from '@angular/core/testing';

import {ProgressIndicatorsService} from './progress-indicators.service';

describe('ProgressIndicatorsService', () => {
  let service: ProgressIndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressIndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
