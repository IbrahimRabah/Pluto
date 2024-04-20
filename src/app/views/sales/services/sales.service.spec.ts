import { TestBed } from '@angular/core/testing';

import { SalesDayService } from './sales.service';

describe('SalesService', () => {
  let service: SalesDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
