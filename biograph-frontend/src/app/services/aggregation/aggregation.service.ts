import {Injectable} from '@angular/core';
import {
  AggregationFunction,
  ChartDataEntry,
  MetricConfiguration
} from '../../components/statistic-page/metrics-monitoring/metrics-monitoring.component';
import * as moment from 'moment';
import {Attribute, AttributeType} from '../../models/Attribute';
import {Event} from '../../models/Event';
import {Parameter} from '../../models/Parameter';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {
  public readonly averageAggregationFunction: AggregationFunction = {
    name: 'Average', description: 'Average value of data', apply(range: number[]): number {
      return range.reduce((a: number, b: number) => (a + b)) / range.length;
    }
  };
  public readonly totalAggregationFunction: AggregationFunction = {
    name: 'Total', description: 'Sum of all data values', apply(range: number[]): number {
      return range.reduce((a: number, b: number) => (a + b));
    }
  };
  public readonly countAggregationFunction: AggregationFunction = {
    name: 'Count', description: 'Total data values amount', apply(range: number[]): number {
      return range.length;
    }
  };
  public readonly minAggregationFunction: AggregationFunction = {
    name: 'Min', description: 'Minimum value of data', apply(range: number[]): number {
      return range.reduce((a: number, b: number) => Math.min(a, b));
    }
  };
  public readonly maxAggregationFunction: AggregationFunction = {
    name: 'Max', description: 'Maximum value of data', apply(range: number[]): number {
      return range.reduce((a: number, b: number) => Math.max(a, b));
    }
  };

  constructor() {
  }

  public aggregate(events: Event[], config: AggregationConfiguration): ChartDataEntry[] {
    const result = this.generateEmptyMetricDataEntry(config);
    // put event date in result
    events.forEach((event: Event) => {
      event.parameters.forEach((parameter: Parameter) => {
        const metricDataEntry = this.findMetricDataEntryByMetric(result, parameter.attribute);
        // if such metric should be displayed
        if (metricDataEntry) {
          // if event is from required date range
          const series = this.findSeriesByRange(metricDataEntry, new Date(event.startDatetime));
          if (series) {
            series._valueAccumulator.push(parameter.value);
          }
        }
      });
    });
    this.applyAggregationFunction(result);
    return result;
  }

  public getAllAggregationFunctions(): AggregationFunction[] {
    return [
      this.averageAggregationFunction,
      this.totalAggregationFunction,
      this.countAggregationFunction,
      this.minAggregationFunction,
      this.maxAggregationFunction,
    ];
  }

  public generateEmptyMetricDataEntry(config: AggregationConfiguration): MetricDataEntry[] {
    return config.metricConfiguration
      .filter((metricConfig: MetricConfiguration) => metricConfig.isDisplayed)
      .map((metricConfig: MetricConfiguration): MetricDataEntry =>
        ({
          name: metricConfig.attribute.name,
          metricConfiguration: metricConfig,
          series: this.generateEmptyMetricSeries(config.startDate, config.endDate, config.step),
        })
      );
  }

  private applyAggregationFunction(dataEntries: MetricDataEntry[]): void {
    dataEntries.forEach((entry: MetricDataEntry) => {
      entry.series.forEach((series: MetricSeries) => {
        switch (entry.metricConfiguration.attribute.attributeType) {
          case AttributeType.NUMBER:
            series.value = entry.metricConfiguration.aggregationFunction.apply(series._valueAccumulator.map((value: string) => +value));
            break;
          case AttributeType.ENUMERATION:
            // TODO asem think about ENUMERATION attributes support
            throw new Error('Unsupported attribute type: ' + entry.metricConfiguration.attribute.attributeType);
          default:
            throw new Error('Unsupported attribute type: ' + entry.metricConfiguration.attribute.attributeType);
        }
      });
    });
  }

  private findMetricDataEntryByMetric(entries: MetricDataEntry[], metric: Attribute): MetricDataEntry {
    return entries.find((entry: MetricDataEntry) => entry.metricConfiguration.attribute.attributeId === metric.attributeId);
  }

  /**
   * Finds the entry for date
   */
  private findSeriesByRange(dataEntry: MetricDataEntry, date: Date): MetricSeries {
    return dataEntry.series.find((series: MetricSeries) =>
      (series.minDateInclusively.getTime() <= date.getTime() && date.getTime() < series.maxDateExclusively.getTime())
    );
  }

  private generateEmptyMetricSeries(startDate: Date, endDate: Date, step: DateStep): MetricSeries[] {
    const result: MetricSeries[] = [];
    let i = startDate;
    while (i.getTime() < endDate.getTime()) {
      const incrementedI = this.incrementDate(i, step);

      result.push({
        name: this.getDateName(i, step),
        _valueAccumulator: [],
        minDateInclusively: i,
        maxDateExclusively: incrementedI,
        value: 0
      });

      i = incrementedI;
    }
    return result;
  }

  private incrementDate(date: Date, step: DateStep): Date {
    // TODO asem NOT IMPORTANT - implement this method. Is is pretty easy to do it
    switch (step.type) {
      case DateStepType.DAY:
        throw new Error('DAY iteration is not supported yet');
      case DateStepType.MONTH:
        return new Date(this.cloneDate(date).setMonth(date.getMonth() + step.amount));
      case DateStepType.YEAR:
        throw new Error('YEAR iteration is not supported yet');
    }
  }

  /**
   * Gets date name according to current scale ( scale is defined by step )
   * Example:
   * date - 'Sat Dec 12 2020 11:29:25 GMT+0300 (Moscow Standard Time)'
   * step - '1 month'
   *
   * result - 'Dec 2020'
   */
  private getDateName(date: Date, step: DateStep): string {
    // TODO asem NOT IMPORTANT - implement this method. Is is pretty easy to do it
    switch (step.type) {
      case DateStepType.DAY:
        throw new Error('DAY iteration is not supported yet');
      case DateStepType.MONTH:
        return moment(date).format('MMM YY');
      case DateStepType.YEAR:
        throw new Error('YEAR iteration is not supported yet');
    }
  }

  private cloneDate(date: Date): Date {
    return new Date(date.getTime());
  }
}

interface MetricSeries {
  name: string;
  value: number;
  // the next 2 properties define date range
  minDateInclusively: Date;
  maxDateExclusively: Date;
  _valueAccumulator: string[];
}

interface MetricDataEntry {
  name: string;
  series: MetricSeries[];
  metricConfiguration: MetricConfiguration;
}

export interface AggregationConfiguration {
  metricConfiguration: MetricConfiguration[];
  startDate: Date;
  endDate: Date;
  step: DateStep;
}

export interface DateStep {
  type: DateStepType;
  amount: number;
}

export enum DateStepType {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
