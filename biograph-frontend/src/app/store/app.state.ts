import * as auth from './reducers/auth.reducers';
import {createSelector} from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};


const getAuthState = (state: AppState) => state.authState;
export const getIsLoggedIn = createSelector(getAuthState, auth.getIsLoggedIn);
