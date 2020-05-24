import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {Event, getStubEmptyEvent} from '../../models/Event';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AppState, getAllEvents} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {CreateEvent, LoadAllEvents} from '../../store/events/actions/event.actions';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.less']
})
export class EventsPageComponent implements OnInit {
  readonly defaultPageSize = 10;
  readonly defaultStartPageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchQuery$ = new BehaviorSubject<string>('');
  filteredEvents$: Observable<Event[]>;
  paginatedEvents$: Observable<Event[]>;
  pageEvents$ = new BehaviorSubject<PageEvent>({pageSize: this.defaultPageSize, pageIndex: this.defaultStartPageIndex, length: 0});

  /**
   * Is used to manually set paginator page index
   */

  constructor(
    private eventService: EventService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private store$: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.store$.dispatch(new LoadAllEvents());
    this.filteredEvents$ = this.store$.select(getAllEvents);
    this.paginatedEvents$ = combineLatest(this.filteredEvents$, this.pageEvents$, this.searchQuery$).pipe(
      map(([fEvents, pageEvent, searchQuery]) => {
        const filtered = this.search(searchQuery, fEvents);
        return filtered.slice(pageEvent.pageSize * pageEvent.pageIndex, pageEvent.pageSize * (pageEvent.pageIndex + 1));
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
        this.store$.dispatch(new CreateEvent(event));
      }
    });
  }

  onPageFired($event: PageEvent) {
    this.pageEvents$.next($event);
  }

  onSearchQueryChanged(currentQuery: string) {
    this.resetPaginator();
    this.searchQuery$.next(currentQuery);
  }

  private resetPaginator(): void {
    this.paginator.pageIndex = 0;
    const prevPageEvent = this.pageEvents$.getValue();
    prevPageEvent.pageIndex = 0;
    this.pageEvents$.next(prevPageEvent);
  }

  private search(searchQuery: string, events: Event[]): Event[] {
    return events.filter((event: Event) => {
      const q = searchQuery.toLowerCase();
      return event.name.toLowerCase().includes(q)
        || event.description.includes(q);
    });
  }
}
