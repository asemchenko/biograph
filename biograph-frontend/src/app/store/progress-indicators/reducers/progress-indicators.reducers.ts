import {AnyProgressIndicatorActions, ProgressIndicatorsActions} from '../actions/progress-indicators.actions';

export interface ProgressIndicatorsState {
  isProgressBarShown: boolean;
  isProgressSpinnerShown: boolean;
}

export const initialState: ProgressIndicatorsState = {
  isProgressBarShown: false,
  isProgressSpinnerShown: false
};

export function reducer(state = initialState, action: AnyProgressIndicatorActions): ProgressIndicatorsState {
  console.log('[progress-indicators-reducer] Got action: ', action.type);
  switch (action.type) {
    case ProgressIndicatorsActions.SHOW_SPINNER:
      return {...state, isProgressSpinnerShown: true};
    case ProgressIndicatorsActions.HIDE_SPINNER:
      return {...state, isProgressSpinnerShown: false};
    case ProgressIndicatorsActions.SHOW_PROGRESS_BAR:
      return {...state, isProgressBarShown: true};
    case ProgressIndicatorsActions.HIDE_PROGRESS_BAR:
      return {...state, isProgressBarShown: false};
    default:
      console.log('[progress-indicators] Default case');
      return state;
  }
}

export const getProgressSpinnerStatus = (state: ProgressIndicatorsState) => state.isProgressSpinnerShown;
export const getProgressBarStatus = (state: ProgressIndicatorsState) => state.isProgressBarShown;
