import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PageStateActions from '../actions/page-state.actions';
import { PageState, NotificationState } from '../models';
import * as fromHelpers from '../../shared/helpers';

export const pageStatesFeatureKey = 'pageStates';

export interface State extends EntityState<PageState> {
  // additional entities state properties
  notification: NotificationState;
  notificationStatus: boolean;
  loadedOrgUnit: any;
  loadOrgUnit: boolean;
  events: any;
  eventsLoading: boolean;
}

export const adapter: EntityAdapter<PageState> = createEntityAdapter<PageState>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  notification: { message: '', statusCode: 0 },
  notificationStatus: false,
  loadedOrgUnit: null,
  loadOrgUnit: false,
  events: [],
  eventsLoading: true,
});

const pageStateReducer = createReducer(
  initialState,
  on(PageStateActions.addEvents, (state, action) => {
    return {
      ...state,
      eventsLoading: false,
      events: action.payload,
    };
  }),
  on(PageStateActions.upsertPageState, (state, action) =>
    adapter.upsertOne(action.pageState, state),
  ),
  on(PageStateActions.addPageStates, (state, action) =>
    adapter.addMany(action.pageStates, state),
  ),
  on(PageStateActions.upsertPageStates, (state, action) =>
    adapter.upsertMany(action.pageStates, state),
  ),
  on(PageStateActions.updatePageState, (state, action) =>
    adapter.updateOne(action.pageState, state),
  ),
  on(PageStateActions.updatePageStates, (state, action) =>
    adapter.updateMany(action.pageStates, state),
  ),
  on(PageStateActions.deletePageState, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(PageStateActions.loadNotification, (state, action) => ({
    ...state,
    notification: action.payload,
    notificationStatus: true,
  })),
  on(PageStateActions.showNotification, (state, action) => ({
    ...state,
    notificationStatus: action.payload,
  })),
  on(PageStateActions.clearPageStates, (state) => adapter.removeAll(state)),
  on(PageStateActions.loadOrgUnitWithAncestors, (state, action) => ({
    ...state,
    loadOrgUnit: true,
  })),
  on(
    PageStateActions.loadOrgUnitWithAncestorsSuccess,
    (state, { payload }) => ({
      ...state,
      loadOrgUnit: false,
      loadedOrgUnit: payload,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return pageStateReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getEventsState = (state: State) => state.events;
export const getEventsLoadingState = (state: State) => state.eventsLoading;
