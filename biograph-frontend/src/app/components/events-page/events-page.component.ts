import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {Event, getStubEmptyEvent} from '../../models/Event';
import {mergeMap, take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.less']
})
export class EventsPageComponent implements OnInit {
  filteredEvents$ = new BehaviorSubject<Event[]>([]);

  constructor(
    private eventService: EventService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.eventService.getEventsOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((events: Event[]) => {
      this.filteredEvents$.next(events);
    });
  }

  openCreateNewEventDialog() {
    const dialogRef = this.dialogService.openEventDialog(getStubEmptyEvent());
    dialogRef.afterClosed().pipe(
      take(1),
      mergeMap((newEvent: Event) => {
        return this.eventService.create(newEvent);
      }),
    ).subscribe((event: Event) => {
      if (event) {
        this.snackBarService.openSuccessSnackBar('Event successfully created');
        const currentAllEvents = this.filteredEvents$.getValue();
        currentAllEvents.push(event);
        this.filteredEvents$.next(currentAllEvents);
      }
    });
  }
}
