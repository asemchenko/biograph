import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {Event, getStubEmptyEvent} from '../../models/Event';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.less']
})
export class EventsPageComponent implements OnInit {
  readonly defaultPageSize = 10;
  readonly defaultStartPageIndex = 0;
  filteredEvents$ = new BehaviorSubject<Event[]>([]);
  paginatedEvents$: Observable<Event[]>;
  pageEvents$ = new BehaviorSubject<PageEvent>({pageSize: this.defaultPageSize, pageIndex: this.defaultStartPageIndex, length: 0});
  /**
   * Is used to manually set paginator page index
   */
  inputPageIndex = this.defaultStartPageIndex;

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
      this.resetPaginator();
    });
    this.paginatedEvents$ = combineLatest(this.filteredEvents$, this.pageEvents$).pipe(
      map(([fEvents, pageEvent]) => {
        console.log('[combine latest] Paginating events...');
        return fEvents.slice(pageEvent.pageSize * pageEvent.pageIndex, pageEvent.pageSize * (pageEvent.pageIndex + 1));
      })
    );
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

  onPageFired($event: PageEvent) {
    console.log('Firing page event', $event);
    this.pageEvents$.next($event);
  }

  private resetPaginator(): void {
    console.log('Resetting paginator');
    this.inputPageIndex = 0;
  }
}
