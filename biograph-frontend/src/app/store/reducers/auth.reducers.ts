import {User} from '../../models/User';
import {All, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};


export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      console.log('[auth.reducer] Got action: LOGIN_SUCCESS');
      console.log('[auth.reducer] Previous state: ', state);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null,
      };
    }
    default: {
      console.log('[auth.reducer] Got action: ', action.type);
      return state;
    }
  }
}


export const getIsLoggedIn = (state: State) => state.isAuthenticated;
