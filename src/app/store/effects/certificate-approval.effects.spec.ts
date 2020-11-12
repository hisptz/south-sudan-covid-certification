import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CertificateApprovalEffects } from './certificate-approval.effects';

describe('CertificateApprovalEffects', () => {
  let actions$: Observable<any>;
  let effects: CertificateApprovalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CertificateApprovalEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<CertificateApprovalEffects>(CertificateApprovalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
