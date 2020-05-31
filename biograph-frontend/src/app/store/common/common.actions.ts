import {Action} from '@ngrx/store';

export enum CommonActions {
  EMPTY_ACTION = '[Common] Empty action',
}

export class EmptyAction implements Action {
  readonly type = CommonActions.EMPTY_ACTION;

  constructor() {
  }
}
