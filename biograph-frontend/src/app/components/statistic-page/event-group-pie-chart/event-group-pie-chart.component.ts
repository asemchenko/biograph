import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {takeUntil} from 'rxjs/operators';
import {TimeSliderChangedEvent} from '../../date-slider/date-slider.component';
import {Event} from '../../../models/Event';
import {EventService} from '../../../services/event/event.service';
import {EventGroup, EventGroupExtractor} from '../statistic-page.component';
import {AppState, getAllEvents} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {LoadAllEvents} from '../../../store/events/actions/event.actions';
import {RxUnsubscribe} from '../../../common/RxUnsubscribe';
import {AggregationService} from '../../../services/aggregation/aggregation.service';

// TODO asem переписать в реактивном стиле, а то тут чет вообще ниочем получилось
@Component({
  selector: 'app-event-group-pie-chart',
  templateUrl: './event-group-pie-chart.component.html',
  styleUrls: ['./event-group-pie-chart.component.less']
})
export class EventGroupPieChartComponent extends RxUnsubscribe implements OnInit {
  @Input()
  eventGroupExtractor: EventGroupExtractor;
  @ViewChild(BaseChartDirective, {static: true}) public chart: BaseChartDirective;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  // FIXME asem IMPORTANT aaaaaaaaaaaaaaaaa
  public pieChartData: SingleDataSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  timeSliderMinDate = new Date('2010-05-19T21:11:23.970Z');
  timeSliderMaxDate = new Date('2020-05-19T21:11:23.970Z');
  private allEvents: Event[] = [];

  constructor(
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef,
    private store$: Store<AppState>,
    private aggregationService: AggregationService,
  ) {
    super();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.store$.dispatch(new LoadAllEvents());
    this.store$.select(getAllEvents).pipe(
      takeUntil(this.destroy$),
    ).subscribe((events: Event[]) => {
      console.log('[event-group-pie-chart] Got all events: ', events);
      this.allEvents = events;
      const eventsTimeRange = this.aggregationService.getEventsTimeRange(events);
      eventsTimeRange.olderEventDate = new Date(eventsTimeRange.olderEventDate.getTime() - 1000 * 60 * 60 * 24);
      eventsTimeRange.newerEventDate = new Date(eventsTimeRange.newerEventDate.getTime() + 1000 * 60 * 60 * 24);
      this.timeSliderMinDate = eventsTimeRange.olderEventDate;
      this.timeSliderMaxDate = eventsTimeRange.newerEventDate;
    });
  }

  onTimeSliderValueChanged($event: TimeSliderChangedEvent) {
    // check that chart component has already initialized
    if (this.chart) {
      const filteredEvents = this.filterEventsByDate($event.selectedStartDate, $event.selectedEndDate);
      this.displayChart(filteredEvents);
    }
  }

  private filterEventsByDate(startDate: Date, endDate: Date): Event[] {
    return this.allEvents.filter((event: Event) => {
      const eventDate = new Date(event.startDatetime);
      return eventDate.getTime() >= startDate.getTime() && eventDate.getTime() <= endDate.getTime();
    });
  }

  private displayChart(events: Event[]): void {
    if (events.length > 0) {
      // maps eventGroupId to total amount of events with such eventGroup
      const stat = new Map<number, number>();
      // map eventGroupId to eventGroup
      const eventGroupMap = new Map<number, EventGroup>();
      for (const event of events) {
        const eventGroups = this.eventGroupExtractor.extract(event);
        for (const eventGroup of eventGroups) {
          let curTotalByGroup = stat.get(eventGroup.id);
          curTotalByGroup = curTotalByGroup || 0;
          stat.set(eventGroup.id, curTotalByGroup + 1);
          eventGroupMap.set(eventGroup.id, eventGroup);
        }
      }
      const labels = [];
      const data = [];
      const eventGroupIds = stat.keys();
      for (const eventGroupId of eventGroupIds) {
        labels.push([eventGroupMap.get(eventGroupId).name]);
        data.push(stat.get(eventGroupId));
      }
      this.pieChartLabels = labels;
      this.pieChartData = data;
    } else {
      this.pieChartLabels = ['No events'];
      this.pieChartData = [100];
    }
    this.chart.update();
    this.changeDetectorRef.detectChanges();
  }
}
