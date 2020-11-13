import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadCertificateApprovals, LoadCertificateApprovalsFailure, LoadCertificateApprovalsSuccess } from '../actions';


export const certificateApprovalFeatureKey = 'certificateApproval';

export interface CerificateApprovalState {
  loading: boolean;
  loaded: boolean;
  approvedCertificates: Array<string>;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<
 any
>();


export const initialState: CerificateApprovalState = adapter.getInitialState({
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

export function reducer(state: CerificateApprovalState | undefined, action: Action) {
  return certificateApprovalReducer(state, action);
}
