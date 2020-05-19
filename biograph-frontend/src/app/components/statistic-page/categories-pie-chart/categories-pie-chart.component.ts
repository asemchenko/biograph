import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {CategoryService} from '../../../services/category/category.service';
import {take} from 'rxjs/operators';
import {TimeSliderChangedEvent} from '../../date-slider/date-slider.component';
import {Event} from '../../../models/Event';
import {EventService} from '../../../services/event/event.service';

// TODO asem переписать в реактивном стиле, а то тут чет вообще ниочем получилось
@Component({
  selector: 'app-categories-pie-chart',
  templateUrl: './categories-pie-chart.component.html',
  styleUrls: ['./categories-pie-chart.component.less']
})
export class CategoriesPieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  // FIXME asem IMPORTANT aaaaaaaaaaaaaaaaa
  public pieChartData: SingleDataSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  timeSliderMinDate = new Date('2010-05-19T21:11:23.970Z');
  timeSliderMaxDate = new Date('2020-05-19T21:11:23.970Z');
  // private allCategories: Category[] = [];
  private allEvents: Event[] = [];

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    /*this.categoryService.getCategoriesOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((categories: Category[]) => {
      this.allCategories = categories;
    });*/
    this.eventService.getEventsOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((events: Event[]) => {
      this.allEvents = events;
      const eventsTimeRange = this.getEventsTimeRange(events);
      eventsTimeRange.olderEventDate = new Date(eventsTimeRange.olderEventDate.getTime() - 1000 * 60 * 60 * 24);
      eventsTimeRange.newerEventDate = new Date(eventsTimeRange.newerEventDate.getTime() + 1000 * 60 * 60 * 24);
      this.timeSliderMinDate = eventsTimeRange.olderEventDate;
      this.timeSliderMaxDate = eventsTimeRange.newerEventDate;
      this.filterEventsByDate(this.timeSliderMinDate, this.timeSliderMaxDate);
    });
  }

  onTimeSliderValueChanged($event: TimeSliderChangedEvent) {
    const filteredEvents = this.filterEventsByDate($event.selectedStartDate, $event.selectedEndDate);
    this.displayChart(filteredEvents);
  }

  private getEventsTimeRange(events: Event[]): { olderEventDate: Date, newerEventDate: Date } {
    let minDate = Number.MAX_SAFE_INTEGER;
    let maxDate = 1;

    for (const event of events) {
      const eventTime = new Date(event.startDatetime).getTime();
      if (eventTime < minDate) {
        minDate = eventTime;
      }
      if (eventTime > maxDate) {
        maxDate = eventTime;
      }
    }
    return {olderEventDate: new Date(minDate), newerEventDate: new Date(maxDate)};
  }

  private filterEventsByDate(startDate: Date, endDate: Date): Event[] {
    return this.allEvents.filter((event: Event) => {
      const eventDate = new Date(event.startDatetime);
      return eventDate.getTime() >= startDate.getTime() && eventDate.getTime() <= endDate.getTime();
    });
  }

  private displayChart(events: Event[]): void {
    const stat = new Map();
    const categoryMap = new Map();
    for (const event of events) {
      let curTotalByCategory = stat.get(event.category.categoryId);
      curTotalByCategory = curTotalByCategory || 0;
      stat.set(event.category.categoryId, curTotalByCategory + 1);
      categoryMap.set(event.category.categoryId, event.category);
    }
    const labels = [];
    const data = [];
    for (const categoryId of stat.keys()) {
      labels.push([categoryMap.get(categoryId).name]);
      data.push(stat.get(categoryId));
      // enable if need to look OK
      // data.push(Math.ceil(Math.random() * 1000));
    }
    this.pieChartLabels = labels;
    this.pieChartData = data;
    this.chart.update();
  }
}
