import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingandpaymentPageComponent } from './billingandpayment-page.component';

describe('BillingandpaymentPageComponent', () => {
  let component: BillingandpaymentPageComponent;
  let fixture: ComponentFixture<BillingandpaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingandpaymentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingandpaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
