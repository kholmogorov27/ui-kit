import { TestBed } from '@angular/core/testing';

import { UiKitLibService } from './ui-kit-lib.service';

describe('UiKitLibService', () => {
  let service: UiKitLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiKitLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
