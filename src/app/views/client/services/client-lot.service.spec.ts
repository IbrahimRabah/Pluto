import { TestBed } from '@angular/core/testing';

import { ClientLotService } from './client-lot.service';

describe('ClientLotService', () => {
  let service: ClientLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
