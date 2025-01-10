import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRejectedComponent } from './contract-rejected.component';

describe('ContractRejectedComponent', () => {
  let component: ContractRejectedComponent;
  let fixture: ComponentFixture<ContractRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
