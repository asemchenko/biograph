import * as auth from './auth/reducers/auth.reducers';
import * as events from './events/reducers/events.reducers';
import {EventsState} from './events/reducers/events.reducers';
import * as progressIndicators from './progress-indicators/reducers/progress-indicators.reducers';
import {ActionReducerMap, createSelector} from '@ngrx/store';

export interface AppState {
  authState: auth.State;
  progressIndicatorsState: progressIndicators.ProgressIndicatorsState;
  eventsState: events.EventsState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: auth.reducer,
  progressIndicatorsState: progressIndicators.reducer,
  eventsState: events.reducer,
};

const getAuthState = (state: AppState) => state.authState;
const getProgressIndicatorsState = (state: AppState) => state.progressIndicatorsState;
const getEventsStatePrivate = (state: AppState) => state.eventsState;

export const getIsLoggedIn = createSelector(getAuthState, auth.getIsLoggedIn);
export const getCurrentUser = createSelector(getAuthState, auth.getCurrentUser);
export const getProgressSpinnerStatus = createSelector(getProgressIndicatorsState, progressIndicators.getProgressSpinnerStatus);
export const getProgressBarStatus = createSelector(getProgressIndicatorsState, progressIndicators.getProgressBarStatus);
export const getEventsState = createSelector(getEventsStatePrivate, (state: EventsState) => state);
export const getAllEvents = createSelector(getEventsStatePrivate, events.getAllEvents);
