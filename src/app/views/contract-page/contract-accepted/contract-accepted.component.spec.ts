import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAcceptedComponent } from './contract-accepted.component';

describe('ContractAcceptedComponent', () => {
  let component: ContractAcceptedComponent;
  let fixture: ComponentFixture<ContractAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAcceptedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
