import { Action, createAction, props } from '@ngrx/store';
import { ApprovedCertificate } from '../models/approved-certificate.model';

export const LoadCertificateApprovals = createAction(
  '[CertificateApproval] Load CertificateApprovals'
);
export const LoadCertificateApprovalsSuccess = createAction(
  '[CertificateApproval] Load CertificateApprovals Success',
  props<{ payload: any }>()
);
export const LoadCertificateApprovalsFailure = createAction(
  '[CertificateApproval] Load CertificateApprovals Success',
  props<{ error: any }>()
);
export const SetUpApprovalCertificateData = createAction(
  '[CertificateApproval]Set Up Approve Certificate Data',
   props<{ payload: any }>()
);

export const SetUpApprovalCertificateDataSuccess = createAction (
  '[CertificateApproval]Set Up Approve Certificate Data Success',
  props<{ data: any }>()
);

export const SetUpApprovalCertificateDataFailure = createAction(
  '[CertificateApproval]Set Up Approve Certificate Data Failure',
  props<{ error: any }>()
);

export const ApproveCertificate = createAction(
  '[CertificateApproval] Approve Certificate',
  props<{ payload: Array<ApprovedCertificate> }>()
);

export const ApproveCertificateSuccess = createAction(
  '[CertificateApproval] Approve Certificate Success',
  props<{ data: any }>()
);

export const ApproveCertificateFailure = createAction(
  '[CertificateApproval] Approve Certificate Failure',
  props<{ error: any }>()
);
