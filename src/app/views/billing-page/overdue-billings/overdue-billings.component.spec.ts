import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueBillingsComponent } from './overdue-billings.component';

describe('OverdueBillingsComponent', () => {
  let component: OverdueBillingsComponent;
  let fixture: ComponentFixture<OverdueBillingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverdueBillingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
