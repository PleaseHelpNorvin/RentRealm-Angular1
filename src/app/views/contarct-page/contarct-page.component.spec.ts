import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContarctPageComponent } from './contarct-page.component';

describe('ContarctPageComponent', () => {
  let component: ContarctPageComponent;
  let fixture: ComponentFixture<ContarctPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContarctPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContarctPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
