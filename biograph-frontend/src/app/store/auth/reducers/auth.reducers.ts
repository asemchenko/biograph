import {User} from '../../../models/User';
import {AnyAuthAction, AuthActionTypes} from '../actions/auth.actions';

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


export function reducer(state = initialState, action: AnyAuthAction): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: JSON.parse(action.payload.data),
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}


export const getIsLoggedIn = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.user;
