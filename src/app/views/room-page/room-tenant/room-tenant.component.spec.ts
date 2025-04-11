import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTenantComponent } from './room-tenant.component';

describe('RoomTenantComponent', () => {
  let component: RoomTenantComponent;
  let fixture: ComponentFixture<RoomTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomTenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
