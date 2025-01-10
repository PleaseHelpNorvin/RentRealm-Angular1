import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPendingComponent } from './contract-pending.component';

describe('ContractPendingComponent', () => {
  let component: ContractPendingComponent;
  let fixture: ComponentFixture<ContractPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
