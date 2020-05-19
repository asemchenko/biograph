import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    console.log('[date-slider] onInit()');
    this.options = {
      floor: this.minDate.getTime(),
      ceil: this.maxDate.getTime(),
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Start:</b> ' + moment(value).format('MMMM YYYY');
          case LabelType.High:
            return '<b>End:</b> ' + moment(value).format('MMMM YYYY');
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
    console.log('[date-slider] Got changes: ', changes);
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
