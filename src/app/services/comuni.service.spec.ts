import { TestBed } from '@angular/core/testing';

import { ComuniService } from './comuni.service';

describe('ComuniService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComuniService = TestBed.get(ComuniService);
    expect(service).toBeTruthy();
  });
});
