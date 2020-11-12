import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CerificateApprovalService } from 'src/app/shared/services/cerificate-approval.service';
import { AppState } from '../reducers';
import * as fromActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CertificateApprovalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private approvalSercive: CerificateApprovalService
  ) {}
  loadCertificateApprovals$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.LoadCertificateApprovals),
        switchMap((action) =>
          this.approvalSercive.loadApprovalCertificateData().pipe(
            map((data) =>
              this.store.dispatch(
                fromActions.LoadCertificateApprovalsSuccess({ payload: data })
              )
            ),
            catchError((error) => {
             if(error && error.status && error.status === '404') {
              // return of(this.store.dispatch(fromActions.))
             }
             return of(
                this.store.dispatch(
                  fromActions.updateNotification({
                    payload: { message: error.message, statusCode: 500 },
                  })
                )
              )}
            )
          )
        )
      ),
    { dispatch: false }
  );

}
