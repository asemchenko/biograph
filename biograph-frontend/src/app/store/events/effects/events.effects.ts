import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EventService} from '../../../services/event/event.service';
import {
  CreateEvent,
  CreateEventFailure,
  CreateEventSuccess,
  EventActionsTypes,
  LoadAllEvents,
  LoadAllEventsFailure,
  LoadAllEventsFromBackend,
  LoadAllEventsSuccess
} from '../actions/event.actions';
import {catchError, exhaustMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {AppState, getEventsState} from '../../app.state';
import {Event} from '../../../models/Event';
import {HideProgressBar, HideSpinner, ShowProgressBar, ShowSpinner} from '../../progress-indicators/actions/progress-indicators.actions';
import {of} from 'rxjs';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Injectable()
export class EventsEffects {
  @Effect()
  LoadAllEvents = this.actions$.pipe(
    ofType<LoadAllEvents>(EventActionsTypes.LOAD_ALL_EVENTS),
    withLatestFrom(this.store.select(getEventsState)),
    map(([action, eventsState]) => {
      if (eventsState.isLoaded) {
        return new LoadAllEventsSuccess(eventsState.events);
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
    exhaustMap((action: Action) => {
      return this.eventService.getEventsOwnedByCurrentUser().pipe(
        map((events: Event[]) => (new LoadAllEventsSuccess(events))),
        catchError((error) => {
          return of(new LoadAllEventsFailure());
        })
      );
    })
  );

  @Effect()
  LoadAllEventsSuccess = this.actions$
    .pipe(
      ofType<LoadAllEventsSuccess>(EventActionsTypes.LOAD_ALL_EVENTS_SUCCESS),
      map(() => {
        return new HideSpinner();
      }),
    );

  @Effect({dispatch: false})
  LoadAllEventsFailure = this.actions$
    .pipe(
      ofType<LoadAllEventsFailure>(EventActionsTypes.LOAD_ALL_EVENTS_FAILURE),
      tap(() => {
        this.store.dispatch(new HideSpinner());
      }),
      tap((action: LoadAllEventsFailure) => {
        this.snackBarService.openErrorSnackBar('Loading all events failed');
      }),
    );

  @Effect()
  CreateEvent = this.actions$.pipe(
    ofType<CreateEvent>(EventActionsTypes.CREATE_EVENT),
    tap(() => {
      this.store.dispatch(new ShowProgressBar());
    }),
    exhaustMap((action: Action) => {
      return this.eventService.create((action as CreateEvent).event).pipe(
        map((event: Event) => {
          return new CreateEventSuccess(event);
        }),
        catchError((error) => {
          return of(new CreateEventFailure(error));
        })
      );
    })
  );

  @Effect()
  CreateEventSuccess = this.actions$
    .pipe(
      ofType<CreateEventSuccess>(EventActionsTypes.CREATE_EVENT_SUCCESS),
      tap((action: CreateEventSuccess) => {
        this.snackBarService.openSuccessSnackBar('Event was successfully created');
      }),
      map(() => {
        return new HideProgressBar();
      }),
    );

  @Effect({dispatch: false})
  CreateEventFailure = this.actions$
    .pipe(
      ofType<CreateEventFailure>(EventActionsTypes.CREATE_EVENT_FAILURE),
      tap(() => {
        this.store.dispatch(new HideProgressBar());
      }),
      tap((action: CreateEventFailure) => {
        this.snackBarService.openErrorSnackBar('Event creation failed');
      }),
    );

  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private store: Store<AppState>,
    private snackBarService: SnackBarService,
  ) {
  }
}
