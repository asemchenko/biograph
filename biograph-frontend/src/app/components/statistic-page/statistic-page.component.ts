import {Component, OnInit} from '@angular/core';
import {Event} from '../../models/Event';
import {Tag} from '../../models/Tag';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.less']
})
export class StatisticPageComponent implements OnInit {
  readonly categoryExtractor = new EventCategoryExtractor();
  readonly tagExtractor = new EventTagExtractor();

  constructor() {
  }

  ngOnInit(): void {
  }

}

export interface EventGroup {
  id: number;
  name: string;
}

/**
 * Extracts EventGroup from Event
 */
export abstract class EventGroupExtractor {
  public abstract extract(event: Event): EventGroup[];
}

export class EventCategoryExtractor extends EventGroupExtractor {
  extract(event: Event): EventGroup[] {
    return [{name: event.category.name, id: event.category.categoryId}];
  }
}

export class EventTagExtractor extends EventGroupExtractor {
  extract(event: Event): EventGroup[] {
    return event.tags.map((tag: Tag): EventGroup => ({id: tag.tagId, name: tag.name}));
  }
}
