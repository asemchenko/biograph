import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import * as moment from 'moment';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.less']
})
export class DateSliderComponent implements OnInit, OnChanges {
  @Input()
  minDate: Date;
  @Input()
  maxDate: Date;
  @Output()
  changedRange = new EventEmitter<TimeSliderChangedEvent>();
  options: Options;

  // internal component data
  currentMinValue: number;
  currentMaxValue: number;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.options = {
      floor: this.minDate.getTime(),
      ceil: this.maxDate.getTime(),
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Start:</b><br/> ' + moment(value).format('MM/DD/YY');
          case LabelType.High:
            return '<b>End:</b><br/>' + moment(value).format('MM/DD/YY');
          default:
            return moment(value).format('MMMM YYYY');
        }
      }
    };
    this.currentMinValue = this.minDate.getTime();
    this.currentMaxValue = this.maxDate.getTime();
    this.changedRange.emit({selectedStartDate: this.minDate, selectedEndDate: this.maxDate});
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newOptions = {...this.options};
    if (changes.minDate) {
      newOptions.floor = this.minDate.getTime();
    }
    if (changes.maxDate) {
      newOptions.ceil = this.maxDate.getTime();
    }
    this.options = newOptions;
  }

  onValueChange($event: number) {
    this.changedRange.emit({selectedStartDate: new Date(this.currentMinValue), selectedEndDate: new Date(this.currentMaxValue)});
  }

  onHighValueChange($event: number) {
    this.changedRange.emit({selectedStartDate: new Date(this.currentMinValue), selectedEndDate: new Date(this.currentMaxValue)});
  }
}

export interface TimeSliderChangedEvent {
  selectedStartDate: Date;
  selectedEndDate: Date;
}
