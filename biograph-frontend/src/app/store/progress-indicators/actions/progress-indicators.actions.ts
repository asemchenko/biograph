import {Action} from '@ngrx/store';

export enum ProgressIndicatorsActions {
  SHOW_SPINNER = '[Progress Indicators] Show Spinner',
  HIDE_SPINNER = '[Progress Indicators] Hide Spinner',
  SHOW_PROGRESS_BAR = '[Progress Indicators] Show Progress Bar',
  HIDE_PROGRESS_BAR = '[Progress Indicators] Hide Progress Bar',
}

export class ShowSpinner implements Action {
  readonly type = ProgressIndicatorsActions.SHOW_SPINNER;

  constructor() {
  }
}

export class HideSpinner implements Action {
  readonly type = ProgressIndicatorsActions.HIDE_SPINNER;

  constructor() {
  }
}

export class ShowProgressBar implements Action {
  readonly type = ProgressIndicatorsActions.SHOW_PROGRESS_BAR;

  constructor() {
  }
}

export class HideProgressBar implements Action {
  readonly type = ProgressIndicatorsActions.HIDE_PROGRESS_BAR;

  constructor() {
  }
}

export type AnyProgressIndicatorActions =
  | ShowSpinner
  | HideSpinner
  | ShowProgressBar
  | HideProgressBar;
