import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPageComponent } from './report-page.component';
import { beforeEach, describe, it } from 'node:test';

describe('ReportPageComponent', () => {
  let component: ReportPageComponent;
  let fixture: ComponentFixture<ReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

