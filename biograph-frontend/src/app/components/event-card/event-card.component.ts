import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../models/Event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.less']
})
export class EventCardComponent implements OnInit {
  @Input()
  event: Event;

  constructor() {
  }

  ngOnInit(): void {
  }

}
