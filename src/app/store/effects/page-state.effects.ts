import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromActions from '../actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnalyticsService } from 'src/app/shared/services';



@Injectable()
export class PageStateEffects {

  constructor(private actions$: Actions, private store: Store<AppState>,
              private analyticsService: AnalyticsService) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadEvents),
      switchMap((action) =>
        this.analyticsService.loadEnrollements1().pipe(
          map((response: any) =>
          this.store.dispatch(fromActions.addEvents({payload: response }))
          ),
          catchError((error: Error) =>
          of(fromActions.loadNotification({payload: {message: error.message, statusCode: 500 } }))
          )
        )
      )
    ), {dispatch: false }
  );

}
