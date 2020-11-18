import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';



export const configFeatureKey = 'config';

export interface State extends EntityState<any> {
  loading: boolean;
  loaded: boolean;
  authorities: Array<string>;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<
 any
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  authorities: null
});

const configReducer = createReducer(
  initialState,
  // on(loadAuthorities, (state, action) => ({
  //   ...state,
  //   loaded: false,
  //   loading: true
  // })),
  // on(loadAuthoritiesSuccess, (state, action) => ({
  //   ...state,
  //   loaded: true,
  //   loading: false,
  //   authorities: action.data
  // }))

);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
