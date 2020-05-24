import {Component, OnInit} from '@angular/core';
import {Attribute} from '../../../models/Attribute';
import {AttributeService} from '../../../services/attribute/attribute.service';
import {AggregationService, DateStepType} from '../../../services/aggregation/aggregation.service';
import {RxUnsubscribe} from '../../../common/RxUnsubscribe';
import {takeUntil} from 'rxjs/operators';
import {Event} from '../../../models/Event';
import {AppState, getAllEvents} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {LoadAllEvents} from '../../../store/events/actions/event.actions';

@Component({
  selector: 'app-metrics-monitoring',
  templateUrl: './metrics-monitoring.component.html',
  styleUrls: ['./metrics-monitoring.component.less']
})
export class MetricsMonitoringComponent extends RxUnsubscribe implements OnInit {
  readonly lineChartOptions = {
    // options
    legend: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    xAxisLabel: 'Time',
    yAxisLabel: 'Metrics',
    timeline: true,
  };
  data: ChartDataEntry[];
  aggregationFunctions: AggregationFunction[];
  configuration: MetricConfiguration[];
  allEvents: Event[] = [];

  constructor(
    private attributeService: AttributeService,
    private aggregationService: AggregationService,
    private store$: Store<AppState>,
  ) {
    super();
  }

  ngOnInit(): void {
    /*this.data = [
      {
        name: 'Cardio',
        series: [
          {name: 'Jan', value: 94},
          {name: 'Feb', value: 24},
          {name: 'Mar', value: 30},
          {name: 'Apr', value: 75},
          {name: 'May', value: 11},
          {name: 'June', value: 71},
          {name: 'July', value: 15},
          {name: 'Aug', value: 42},
          {name: 'Sept', value: 92},
          {name: 'Oct', value: 83},
          {name: 'Nov', value: 7},
          {name: 'Dec', value: 17}],
      },
      {
        name: 'Squat',
        series: [{name: 'Jan', value: 25}, {name: 'Feb', value: 21}, {name: 'Mar', value: 8}, {name: 'Apr', value: 56}, {
          name: 'May',
          value: 96
        }, {name: 'June', value: 97}, {name: 'July', value: 55}, {name: 'Aug', value: 80}, {name: 'Sept', value: 23}, {
          name: 'Oct',
          value: 33
        }, {name: 'Nov', value: 86}, {name: 'Dec', value: 97}]
      },
      {
        name: 'Stress',
        series: [{name: 'Jan', value: 79}, {name: 'Feb', value: 13}, {name: 'Mar', value: 94}, {name: 'Apr', value: 34}, {
          name: 'May',
          value: 4
        }, {name: 'June', value: 54}, {name: 'July', value: 38}, {name: 'Aug', value: 7}, {name: 'Sept', value: 48}, {
          name: 'Oct',
          value: 39
        }, {name: 'Nov', value: 56}, {name: 'Dec', value: 96}]
      },
      {
        name: 'Productivity',
        series: [{name: 'Jan', value: 76}, {name: 'Feb', value: 29}, {name: 'Mar', value: 76}, {name: 'Apr', value: 19}, {
          name: 'May',
          value: 94
        }, {name: 'June', value: 59}, {name: 'July', value: 41}, {name: 'Aug', value: 42}, {name: 'Sept', value: 8}, {
          name: 'Oct',
          value: 63
        }, {name: 'Nov', value: 100}, {name: 'Dec', value: 78}]
      },
      {
        name: 'Happyness',
        series: [{name: 'Jan', value: 11}, {name: 'Feb', value: 46}, {name: 'Mar', value: 55}, {name: 'Apr', value: 57}, {
          name: 'May',
          value: 100
        }, {name: 'June', value: 41}, {name: 'July', value: 44}, {name: 'Aug', value: 73}, {name: 'Sept', value: 83}, {
          name: 'Oct',
          value: 59
        }, {name: 'Nov', value: 88}, {name: 'Dec', value: 17}]
      }
    ];*/
    this.store$.dispatch(new LoadAllEvents());
    this.store$.select(getAllEvents).pipe(
      takeUntil(this.destroy$),
    ).subscribe((events: Event[]) => {
      this.allEvents = events;
    });
    this.attributeService.getAttributesOwnedByCurrentUser().pipe(
      takeUntil(this.destroy$),
    ).subscribe((attributes: Attribute[]) => {
      this.configuration = attributes.map((attribute: Attribute) => {
        return {attribute, aggregationFunction: this.getDefaultAggregationFunction(), isDisplayed: false, isNormalized: false};
      });
    });
    this.aggregationFunctions = this.aggregationService.getAllAggregationFunctions();
  }

  onConfigurationApply($event: MouseEvent): void {
    console.log('Applying configuration...');
    const dateRange = this.aggregationService.getEventsTimeRange(this.allEvents);
    this.data = this.aggregationService.aggregate(this.allEvents,
      {
        metricConfiguration: this.configuration,
        startDate: dateRange.olderEventDate,
        endDate: dateRange.newerEventDate,
        step: {type: DateStepType.MONTH, amount: 1},
      });
    console.log('[metrics-monitoring] Got data: ', this.data);
  }

  private getDefaultAggregationFunction(): AggregationFunction {
    return this.aggregationService.averageAggregationFunction;
  }
}

export interface ChartDataEntry {
  name: string;
  series: DataSeriesEntry[];
}

export interface DataSeriesEntry {
  name: string;
  value: number;
}

export interface MetricConfiguration {
  attribute: Attribute;
  isDisplayed: boolean;
  isNormalized: boolean;
  aggregationFunction: AggregationFunction;
}

export abstract class AggregationFunction {
  name: string;
  description: string;

  public abstract apply(range: number[]): number;
}
