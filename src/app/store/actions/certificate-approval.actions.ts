import { Action, createAction, props } from '@ngrx/store';

// export enum CertificateApprovalActionTypes {
//   LoadCertificateApprovals = '[CertificateApproval] Load CertificateApprovals',
//   LoadCertificateApprovalsSuccess = '[CertificateApproval] Load CertificateApprovals Success',
//   LoadCertificateApprovalsFailure = '[CertificateApproval] Load CertificateApprovals Failure',
//   SetUpApprovalCertificateData = '[CertificateApproval]Set Up Approve Certificate Data',
//   SetUpApprovalCertificateDataSuccess = '[CertificateApproval]Set Up Approve Certificate Data Success',
//   SetUpApprovalCertificateDataFailure = '[CertificateApproval]Set Up Approve Certificate Data Failure',
//   ApproveCertificate = '[CertificateApproval] Approve Certificate',
//   ApproveCertificateSuccess = '[CertificateApproval] Approve Certificate Success',
//   ApproveCertificateFailure = '[CertificateApproval] Approve Certificate Failure',
// }

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

// export class LoadCertificateApprovalsSuccess implements Action {
//   readonly type =
//     CertificateApprovalActionTypes.LoadCertificateApprovalsSuccess;
//   constructor(public payload: { data: any }) {}
// }

// export class LoadCertificateApprovalsFailure implements Action {
//   readonly type =
//     CertificateApprovalActionTypes.LoadCertificateApprovalsFailure;
//   constructor(public payload: { error: any }) {}
// }

// export class SetUpApprovalCertificateData implements Action {
//   readonly type = CertificateApprovalActionTypes.SetUpApprovalCertificateData;
// }

// export class SetUpApprovalCertificateDataSuccess implements Action {
//   readonly type =
//     CertificateApprovalActionTypes.SetUpApprovalCertificateDataSuccess;
//   constructor(public payload: { data: any }) {}
// }

// export class SetUpApprovalCertificateDataFailure implements Action {
//   readonly type =
//     CertificateApprovalActionTypes.SetUpApprovalCertificateDataFailure;
//   constructor(public payload: { error: any }) {}
// }


// export class ApproveCertificate implements Action {
//   readonly type = CertificateApprovalActionTypes.ApproveCertificate;
// }

// export class ApproveCertificateSuccess implements Action {
//   readonly type = CertificateApprovalActionTypes.ApproveCertificateSuccess;
//   constructor(public payload: { data: any }) {}
// }

// export class ApproveCertificateFailure implements Action {
//   readonly type = CertificateApprovalActionTypes.ApproveCertificateFailure;
//   constructor(public payload: { error: any }) {}
// }

// export type CertificateApprovalActions =
//   | LoadCertificateApprovals
//   | LoadCertificateApprovalsSuccess
//   | LoadCertificateApprovalsFailure
//   | ApproveCertificate
//   | ApproveCertificateSuccess
//   | ApproveCertificateFailure
//   | SetUpApprovalCertificateData
//   | SetUpApprovalCertificateDataSuccess
//   | SetUpApprovalCertificateDataFailure;
