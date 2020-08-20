import { TestBed } from '@angular/core/testing';

import { SchemasService } from './schemas.service';

describe('SchemasService', () => {
  let service: SchemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
