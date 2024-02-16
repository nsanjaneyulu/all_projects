import { TestBed } from '@angular/core/testing';

import { PaymentSelectionService } from './payment-selection.service';

describe('PaymentSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentSelectionService = TestBed.get(PaymentSelectionService);
    expect(service).toBeTruthy();
  });
});
