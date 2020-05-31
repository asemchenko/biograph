import {Action} from '@ngrx/store';
import {Event} from '../../../models/Event';
import {ProgressIndicatorType} from '../../progress-indicators/actions/progress-indicators.actions';

export enum EventActionsTypes {
  CREATE_EVENT = '[Events] Create event',
  CREATE_EVENT_SUCCESS = '[Events] Create event success',
  CREATE_EVENT_FAILURE = '[Events] Create event failure',
  LOAD_ALL_EVENTS = '[Events] Load all',
  LOAD_ALL_EVENTS_SUCCESS = '[Events] Load all events success',
  LOAD_ALL_EVENTS_FAILURE = '[Events] Load all events failure',
  LOAD_ALL_EVENTS_FROM_BACKEND = '[Events] Load all from backend',
}

export class LoadAllEvents implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS;
}

export class CreateEvent implements Action {
  readonly type = EventActionsTypes.CREATE_EVENT;

  constructor(public event: Event) {
  }
}

export class CreateEventSuccess implements Action {
  readonly type = EventActionsTypes.CREATE_EVENT_SUCCESS;

  constructor(public createdEvent: Event) {
  }
}

export class CreateEventFailure implements Action {
  readonly type = EventActionsTypes.CREATE_EVENT_FAILURE;

  constructor(public error: any) {
  }
}

export class LoadAllEventsFromBackend implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS_FROM_BACKEND;

  constructor(public progressIndicator: ProgressIndicatorType) {
  }
}

export class LoadAllEventsSuccess implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS_SUCCESS;

  constructor(public events: Event[], public progressIndicator: ProgressIndicatorType) {
  }
}

export class LoadAllEventsFailure implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS_FAILURE;

  constructor(public progressIndicator: ProgressIndicatorType) {
  }
}


export type AnyEventAction =
  | LoadAllEvents
  | LoadAllEventsFromBackend
  | CreateEventSuccess
  | CreateEventFailure
  | LoadAllEventsSuccess
  | LoadAllEventsFailure
  | CreateEvent;
