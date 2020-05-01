import * as auth from './reducers/auth.reducers';
import {ActionReducerMap, createSelector} from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: auth.reducer
};

const getAuthState = (state: AppState) => state.authState;
export const getIsLoggedIn = createSelector(getAuthState, auth.getIsLoggedIn);
export const getCurrentUser = createSelector(getAuthState, auth.getCurrentUser);
