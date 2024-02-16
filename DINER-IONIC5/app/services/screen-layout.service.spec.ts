import { TestBed } from '@angular/core/testing';

import { ScreenLayoutService } from './screen-layout.service';

describe('ScreenLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenLayoutService = TestBed.get(ScreenLayoutService);
    expect(service).toBeTruthy();
  });
});
