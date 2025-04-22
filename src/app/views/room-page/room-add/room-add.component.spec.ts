import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddComponent } from './room-add.component';
import { beforeEach, describe } from 'node:test';

describe('RoomAddComponent', () => {
  let component: RoomAddComponent;
  let fixture: ComponentFixture<RoomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
