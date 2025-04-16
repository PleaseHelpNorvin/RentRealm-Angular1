import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverduePaymentsComponent } from './overdue-payments.component';

describe('OverduePaymentsComponent', () => {
  let component: OverduePaymentsComponent;
  let fixture: ComponentFixture<OverduePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverduePaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverduePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
