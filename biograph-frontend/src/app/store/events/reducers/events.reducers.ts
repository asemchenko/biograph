import {Event} from '../../../models/Event';
import {AnyEventAction, EventActionsTypes, EventsLoadSuccess} from '../actions/event.actions';

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
    case EventActionsTypes.EVENTS_LOAD_SUCCESS:
      return {isLoaded: true, events: (action as EventsLoadSuccess).events};
    case EventActionsTypes.EVENTS_LOAD_FAILURE:
      return {isLoaded: false, events: []};
    default: {
      console.log('[event.reducer] Got action: ', action.type);
      return state;
    }
  }
}


export const getAllEvents = (state: EventsState) => state.events;
