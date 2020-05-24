import {Event} from '../../../models/Event';
import {AnyEventAction, CreateEventSuccess, EventActionsTypes, LoadAllEventsSuccess} from '../actions/event.actions';

export interface EventsState {
  isLoaded: boolean;
  events: Event[];
}

export const initialState: EventsState = {
  isLoaded: false,
  events: [],
};


export function reducer(state = initialState, action: AnyEventAction): EventsState {
  switch (action.type) {
    case EventActionsTypes.LOAD_ALL_EVENTS_SUCCESS:
      return {isLoaded: true, events: (action as LoadAllEventsSuccess).events};
    case EventActionsTypes.LOAD_ALL_EVENTS_FAILURE:
      return {isLoaded: false, events: []};
    case EventActionsTypes.CREATE_EVENT_SUCCESS:
      return {isLoaded: state.isLoaded, events: [...state.events, (action as CreateEventSuccess).createdEvent]};
    default: {
      return state;
    }
  }
}


export const getAllEvents = (state: EventsState) => state.events;
