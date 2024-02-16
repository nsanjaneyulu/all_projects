import { TestBed } from '@angular/core/testing';

import { OrderSummaryService } from './order-summary.service';

describe('OrderSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderSummaryService = TestBed.get(OrderSummaryService);
    expect(service).toBeTruthy();
  });
});
