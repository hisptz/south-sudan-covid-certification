import { TestBed } from '@angular/core/testing';

import { CerificateApprovalService } from './cerificate-approval.service';

describe('CerificateApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CerificateApprovalService = TestBed.get(CerificateApprovalService);
    expect(service).toBeTruthy();
  });
});
