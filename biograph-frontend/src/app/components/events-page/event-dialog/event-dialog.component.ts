import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../models/Event';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Category} from '../../../models/Category';
import {CategoryService} from '../../../services/category/category.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.less']
})
export class EventDialogComponent implements OnInit {
  private event: Event;
  readonly eventNameMaxLength = 256;
  readonly timeBoundedOption = {
    optionId: 2,
    name: 'Bounded',
    description: 'Event has time limits'
  };
  readonly eventTimeBoundOptions = [
    {
      optionId: 1,
      name: 'Not bounded',
      description: 'No time bounds'
    },
    this.timeBoundedOption,
  ];
  categories$: Observable<Category[]>;

  constructor(
      @Inject(MAT_DIALOG_DATA) private dialogData: { event: Event },
      private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesOwnedByCurrentUser();
    console.log('Got dialog data: ', this.dialogData);
    // TODO asem set event property here
  }
}
