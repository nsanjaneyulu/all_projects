import { TestBed } from '@angular/core/testing';

import { ViewCartService } from './view-cart.service';

describe('ViewCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewCartService = TestBed.get(ViewCartService);
    expect(service).toBeTruthy();
  });
});
