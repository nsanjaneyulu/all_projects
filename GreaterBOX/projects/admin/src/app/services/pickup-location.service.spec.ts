import { TestBed } from '@angular/core/testing';

import { PickupLocationService } from './pickup-location.service';

describe('PickupLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickupLocationService = TestBed.get(PickupLocationService);
    expect(service).toBeTruthy();
  });
});
