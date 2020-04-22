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
      return {
        ...state,
        isAuthenticated: true,
        user: JSON.parse(action.payload.data),
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGOUT: {
      console.log('[auth.reducer] Got action: LOGOUT');
      return initialState;
    }
    default: {
      console.log('[auth.reducer] Got action: ', action.type);
      return state;
    }
  }
}


export const getIsLoggedIn = (state: State) => state.isAuthenticated;
