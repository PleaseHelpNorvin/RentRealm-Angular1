import { TestBed } from '@angular/core/testing';

import { HandymanService } from './handyman.service';

describe('HandymanService', () => {
  let service: HandymanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandymanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
