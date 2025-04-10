import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPageComponent } from './property-page.component';

describe('PropertyPageComponent', () => {
  let component: PropertyPageComponent;
  let fixture: ComponentFixture<PropertyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
