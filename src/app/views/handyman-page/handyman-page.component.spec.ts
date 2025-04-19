import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandymanPageComponent } from './handyman-page.component';

describe('HandymanPageComponent', () => {
  let component: HandymanPageComponent;
  let fixture: ComponentFixture<HandymanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandymanPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandymanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
