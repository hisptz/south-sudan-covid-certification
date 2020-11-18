import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadCertificateApprovals, LoadCertificateApprovalsFailure, LoadCertificateApprovalsSuccess } from '../actions';
import { ApprovedCertificate } from '../models/approved-certificate.model';


export const certificateApprovalFeatureKey = 'certificateApproval';

export interface State  extends EntityState<any> {
  loading: boolean;
  loaded: boolean;
  approvedCertificates: Array<ApprovedCertificate>;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<
 any
>();


export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  approvedCertificates: null
});

export const certificateApprovalReducer = createReducer(
  initialState,
  on(LoadCertificateApprovals, (state, action) => ({
    ...state,
    loaded: false,
    loading: true
  })),
  on(LoadCertificateApprovalsSuccess, (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    approvedCertificates: action.payload
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return certificateApprovalReducer(state, action);
}
