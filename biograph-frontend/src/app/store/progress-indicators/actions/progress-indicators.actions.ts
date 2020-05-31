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

export enum ProgressIndicatorType {
  SPINNER = 'SPINNER',
  PROGRESS_BAR = 'PROGRESS_BAR'
}

export type AnyProgressIndicatorActions =
  | ShowSpinner
  | HideSpinner
  | ShowProgressBar
  | HideProgressBar;

export function getShowProgressIndicatorAction(indicatorType: ProgressIndicatorType): AnyProgressIndicatorActions {
  switch (indicatorType) {
    case ProgressIndicatorType.SPINNER:
      return new ShowSpinner();
    case ProgressIndicatorType.PROGRESS_BAR:
      return new ShowProgressBar();
  }
}

export function getHideProgressIndicatorAction(indicatorType: ProgressIndicatorType): AnyProgressIndicatorActions {
  switch (indicatorType) {
    case ProgressIndicatorType.SPINNER:
      return new HideSpinner();
    case ProgressIndicatorType.PROGRESS_BAR:
      return new HideProgressBar();
  }
}
