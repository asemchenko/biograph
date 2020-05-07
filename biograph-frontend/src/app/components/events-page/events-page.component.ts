import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {getStubEmptyEvent} from '../../models/Event';

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
  }
}
