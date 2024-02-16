import { TestBed } from '@angular/core/testing';

import { SetGetMallsService } from './set-get-malls.service';

describe('SetGetMallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetGetMallsService = TestBed.get(SetGetMallsService);
    expect(service).toBeTruthy();
  });
});
