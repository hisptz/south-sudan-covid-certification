import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/services/config.service';
import * as fromActions from '../actions';
import { AppState } from '../reducers';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private configService: ConfigService
  ) {}
  // loadAuthorities$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(fromActions.loadAuthorities),
  //       switchMap((action) =>
  //         this.configService.getAuthorities().pipe(
  //           map((data: any) => {
  //             return this.store.dispatch(
  //               fromActions.loadAuthoritiesSuccess({
  //                 data,
  //               })
  //             );
  //           }),
  //           catchError((error) => {
  //             return of(
  //               this.store.dispatch(
  //                 fromActions.updateNotification({
  //                   payload: { message: error.message, statusCode: 500 },
  //                 })
  //               )
  //             );
  //           })
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
