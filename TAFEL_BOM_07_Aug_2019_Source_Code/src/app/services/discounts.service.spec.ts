import { TestBed } from '@angular/core/testing';

import { DiscountsService } from './discounts.service';

describe('DiscountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountsService = TestBed.get(DiscountsService);
    expect(service).toBeTruthy();
  });
});
