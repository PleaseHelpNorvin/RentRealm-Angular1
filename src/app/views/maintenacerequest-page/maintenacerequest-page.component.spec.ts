import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenacerequestPageComponent } from './maintenacerequest-page.component';

describe('MaintenacerequestPageComponent', () => {
  let component: MaintenacerequestPageComponent;
  let fixture: ComponentFixture<MaintenacerequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenacerequestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenacerequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
