import { TestBed } from '@angular/core/testing';

import { RedepositService } from './redeposit.service';

describe('RedepositService', () => {
  let service: RedepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
