import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {Event, getStubEmptyEvent} from '../../models/Event';
import {mergeMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.less']
})
export class EventsPageComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
  }

  openCreateNewEventDialog() {
    console.log('Opening new event dialog...');
    const dialogRef = this.dialogService.openEventDialog(getStubEmptyEvent());
    dialogRef.afterClosed().pipe(
      take(1),
      mergeMap((newEvent: Event) => {
        return this.eventService.create(newEvent);
      }),
    ).subscribe((event: Event) => {
      console.log('[events-page] Got created event from service: ', event);
    });
    /*dialogRef.afterClosed().subscribe((newEvent: Event) => {
      this.eventService.create(newEvent)
    })*/
  }
}
