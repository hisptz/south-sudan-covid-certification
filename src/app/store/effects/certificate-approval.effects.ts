import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CerificateApprovalService } from 'src/app/shared/services/cerificate-approval.service';
import { AppState } from '../reducers';
import * as fromActions from '../actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CertificateApprovalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private approvalSercive: CerificateApprovalService,
    private snackBar: MatSnackBar,
  ) {}
  loadCertificateApprovals$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.LoadCertificateApprovals),
        switchMap((action) =>
          this.approvalSercive.loadApprovalCertificateData().pipe(
            map((data: any) => {
              const approvedCertificates =
                data && data.approvedCertificates
                  ? data.approvedCertificates
                  : [];
              return this.store.dispatch(
                fromActions.LoadCertificateApprovalsSuccess({
                  payload: approvedCertificates,
                }),
              );
            }),
            catchError((error) => {
              if (error && error.status && error.status === 404) {
                return of(
                  this.store.dispatch(
                    fromActions.SetUpApprovalCertificateData({
                      payload: { approvedCertificates: [] },
                    }),
                  ),
                );
              }
              return of(
                this.store.dispatch(
                  fromActions.updateNotification({
                    payload: { message: error.message, statusCode: 500 },
                  }),
                ),
              );
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  setUpApprovalCertificateData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.SetUpApprovalCertificateData),
        switchMap((action) =>
          this.approvalSercive
            .setUpApprovalCertificateData(action.payload)
            .pipe(
              map((data) => {
                this.store.dispatch(fromActions.LoadCertificateApprovals());
                return this.store.dispatch(
                  fromActions.SetUpApprovalCertificateDataSuccess({ data }),
                );
              }),
              catchError((error) => {
                return of(
                  this.store.dispatch(
                    fromActions.updateNotification({
                      payload: { message: error.message, statusCode: 500 },
                    }),
                  ),
                );
              }),
            ),
        ),
      ),
    { dispatch: false },
  );

  approveCertificate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.ApproveCertificate),
        switchMap((action) =>
          this.approvalSercive
            .approveCertificate(action.certificates, action.newCertificate)
            .pipe(
              map((data) => {
                this.snackBar.open('Certificate approved successfully', null, {
                  duration: 3000,
                });
                this.store.dispatch(fromActions.LoadCertificateApprovals());
                return this.store.dispatch(
                  fromActions.ApproveCertificateSuccess({ data }),
                );
              }),
              catchError((error) => {
                if (error && error.status && error.status === 404) {
                  return of(
                    this.store.dispatch(
                      fromActions.SetUpApprovalCertificateData({
                        payload: { approvedCertificates: action.certificates },
                      }),
                    ),
                  );
                }
                return of(
                  this.store.dispatch(
                    fromActions.updateNotification({
                      payload: { message: error.message, statusCode: 500 },
                    }),
                  ),
                );
              }),
            ),
        ),
      ),
    { dispatch: false },
  );

  // approveCertificateSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromActions.ApproveCertificateSuccess),
  //     tap((action) => {
  //       this.snackBar.open('Certificate approved successfully', null, {
  //         duration: 3000,
  //       });
  //       // this.store.dispatch(fromActions.loadCurrentUser());
  //       // this.store.dispatch(fromActions.loadEvents());
  //       this.store.dispatch(fromActions.LoadCertificateApprovals());
  //     })
  //   )
  // );
}
