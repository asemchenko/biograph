import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EventService} from '../../../services/event/event.service';
import {EventActionsTypes, EventsLoadFailure, EventsLoadSuccess, LoadAllEvents, LoadAllEventsFromBackend} from '../actions/event.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {AppState, getEventsState} from '../../app.state';
import {Event} from '../../../models/Event';
import {HideSpinner, ShowSpinner} from '../../progress-indicators/actions/progress-indicators.actions';

@Injectable()
export class EventsEffects {
  @Effect()
  LoadAllEvents = this.actions$.pipe(
    ofType<LoadAllEvents>(EventActionsTypes.LOAD_ALL_EVENTS),
    withLatestFrom(this.store.select(getEventsState)),
    map(([action, eventsState]) => {
      if (eventsState.isLoaded) {
        return new EventsLoadSuccess(eventsState.events);
      } else {
        return new LoadAllEventsFromBackend();
      }
    })
  );

  @Effect()
  LoadAllEventsFromBackend = this.actions$.pipe(
    ofType<LoadAllEvents>(EventActionsTypes.LOAD_ALL_EVENTS_FROM_BACKEND),
    tap(() => {
      this.store.dispatch(new ShowSpinner());
    }),
    switchMap((action: Action) => {
      const eventsLoadSuccess = this.eventService.getEventsOwnedByCurrentUser().pipe(
        map((events: Event[]) => (new EventsLoadSuccess(events))),
        catchError((error) => {
          this.store.dispatch(new HideSpinner());
          return [new EventsLoadFailure()];
        })
      );
      return [eventsLoadSuccess, new HideSpinner()];
    })
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private store: Store<AppState>,
  ) {
  }
}
