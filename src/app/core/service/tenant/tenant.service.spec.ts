import { TestBed } from '@angular/core/testing';
import { TenantService } from '../../service/tenant/tenant.service'; 

describe('TenantService', () => {
  let service: TenantService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      
    });
    service = TestBed.inject(TenantService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
