import { TestBed } from '@angular/core/testing';

import { CompaniesSharedService } from './companies-shared.service';

describe('CompaniesSharedService', () => {
  let service: CompaniesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
