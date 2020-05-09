import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../models/Event';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.less']
})
export class EventDialogComponent implements OnInit {
  private event: Event;
  readonly eventNameMaxLength = 256;
  readonly eventTimeBoundOptions = [
    {
      optionId: 1,
      name: 'Not bounded',
      description: 'No time bounds'
    },
    {
      optionId: 2,
      name: 'Bounded',
      description: 'Event has time limits'
    },
  ];

  constructor(
      @Inject(MAT_DIALOG_DATA) private dialogData: { event: Event }
  ) {
  }

  ngOnInit(): void {
    console.log('Got dialog data: ', this.dialogData);
    // TODO asem set event property here
  }
}
