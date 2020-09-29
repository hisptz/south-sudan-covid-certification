import { createSelector } from '@ngrx/store';
import * as fromMainReducer from '../reducers';
import * as fromPageStateReducer from '../reducers/page-state.reducer';
import { getRouterParams } from './router.selectors';

export const getPageState = createSelector(
    fromMainReducer.getRootState,
    (state: fromMainReducer.AppState) => state.pageState
);

export const getEvents = createSelector(
    getPageState,
    fromPageStateReducer.getEventsState
);

export const getEventsLoading = createSelector(
    getPageState,
    fromPageStateReducer.getEventsLoadingState
);

export const getSelectedEventFromRouteParams = createSelector(
    getEvents,
    getRouterParams,
    (events, routerParams) => {
      const psiuid = routerParams.psi ? routerParams.psi : '';
      const currentEvent = (events || []).filter(event => event.psi === psiuid);
      return currentEvent[0] ? currentEvent[0] : {};
    }
);
