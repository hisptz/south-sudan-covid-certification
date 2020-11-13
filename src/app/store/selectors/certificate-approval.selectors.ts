import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, getRootState } from '../reducers';
export const getCertificateApprovalState = createSelector(
  getRootState,
  (state: AppState) => state.certificateApproval
);
export const getApprovedCertificates = createSelector(
  getRootState,
  getCertificateApprovalState,
  (state, certificateApproval) => certificateApproval.approvedCertificates
);
export const getApprovedCertificatesLoadingStatus = createSelector(
  getRootState,
  getCertificateApprovalState,
  (state, certificateApproval) => certificateApproval.loading
);
export const getApprovedCertificatesLoadedStatus = createSelector(
  getRootState,
  getCertificateApprovalState,
  (state, certificateApproval) => certificateApproval.loaded
);
