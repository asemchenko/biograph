import {Action} from '@ngrx/store';
import {Event} from '../../../models/Event';

export enum EventActionsTypes {
  CREATE_EVENT = '[Events] Create event',
  LOAD_ALL_EVENTS = '[Events] Load all',
  LOAD_ALL_EVENTS_FROM_BACKEND = '[Events] Load all from backend',
  EVENTS_LOAD_SUCCESS = '[Events] Events load success',
  EVENTS_LOAD_FAILURE = '[Events] Events load success',
}

export class LoadAllEvents implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS;
}

export class CreateEvent implements Action {
  readonly type = EventActionsTypes.CREATE_EVENT;

  constructor(public event: Event) {
  }
}

export class LoadAllEventsFromBackend implements Action {
  readonly type = EventActionsTypes.LOAD_ALL_EVENTS_FROM_BACKEND;
}

export class EventsLoadSuccess implements Action {
  readonly type = EventActionsTypes.EVENTS_LOAD_SUCCESS;

  constructor(public events: Event[]) {
  }
}

export class EventsLoadFailure implements Action {
  readonly type = EventActionsTypes.EVENTS_LOAD_FAILURE;
}


export type AnyEventAction =
  | LoadAllEvents
  | EventsLoadSuccess
  | EventsLoadFailure
  | CreateEvent;
