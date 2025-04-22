import { TestBed } from '@angular/core/testing';

import { SettingService } from './setting.service';
import { beforeEach, describe, it } from 'node:test';

describe('SettingService', () => {
  let service: SettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingService);
  });

 
});

