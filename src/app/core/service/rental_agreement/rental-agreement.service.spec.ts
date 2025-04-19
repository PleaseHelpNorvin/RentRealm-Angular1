import { TestBed } from '@angular/core/testing';

import { RentalAgreementService } from './rental-agreement.service';

describe('RentalAgreementService', () => {
  let service: RentalAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
