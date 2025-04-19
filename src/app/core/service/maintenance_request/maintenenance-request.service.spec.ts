import { TestBed } from '@angular/core/testing';

import { MaintenenanceRequestService } from './maintenenance-request.service';

describe('MaintenenanceRequestService', () => {
  let service: MaintenenanceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenenanceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
