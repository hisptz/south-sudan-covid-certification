import { createSelector } from "@ngrx/store";
import * as fromMainReducer from "../reducers";
import * as fromPageStateReducer from "../reducers/page-state.reducer";
import { getRouterParams } from "./router.selectors";

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
export const getLoadedOrgUnitData = createSelector(
  getPageState,
  (state) => state.loadedOrgUnit
);
export const getLoadingOrgUnitDataStatus = createSelector(
    getPageState,
    (state) => state.loadOrgUnit
  );

export const getLoadedOrgUnitAncestors = createSelector(
  getPageState,
  getLoadedOrgUnitData,
  (state, loadedOrgUnit) => {
    let ancestorObj = {};
    if (loadedOrgUnit && loadedOrgUnit.ancestors) {
      for (const ancestor of loadedOrgUnit.ancestors) {
        if (
          ancestor &&
          ancestor.level &&
          ancestor.name &&
          ancestor.level === 1
        ) {
          ancestorObj = { ...ancestorObj, country: ancestor.name };
        } else if (
          ancestor &&
          ancestor.level &&
          ancestor.name &&
          ancestor.level === 2
        ) {
          ancestorObj = { ...ancestorObj, state: ancestor.name };
        } else if (
          ancestor &&
          ancestor.level &&
          ancestor.name &&
          ancestor.level === 3
        ) {
          ancestorObj = { ...ancestorObj, county: ancestor.name };
        } else {
          ancestorObj = { ...ancestorObj };
        }
      }
    }
    return ancestorObj;
  }
);
export const getSelectedEventFromRouteParams = createSelector(
  getEvents,
  getRouterParams,
  (events, routerParams) => {
    const psiuid = routerParams.psi ? routerParams.psi : "";
    const currentEvent = (events || []).filter((event) => event.psi === psiuid);
    return currentEvent[0] ? currentEvent[0] : {};
  }
);
