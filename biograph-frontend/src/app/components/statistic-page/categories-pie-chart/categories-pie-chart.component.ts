import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {CategoryService} from '../../../services/category/category.service';
import {take} from 'rxjs/operators';
import {Category} from '../../../models/Category';
import {LabelType, Options} from 'ng5-slider';
import * as moment from 'moment';


@Component({
  selector: 'app-categories-pie-chart',
  templateUrl: './categories-pie-chart.component.html',
  styleUrls: ['./categories-pie-chart.component.less']
})
export class CategoriesPieChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [300, 400, 800, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  minDate = new Date('2010-05-19T20:45:59.007Z').getTime();
  maxDate = new Date('2020-05-19T20:45:59.007Z').getTime();
  options: Options = {
    floor: this.minDate,
    ceil: this.maxDate,
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
  sliderMinValue = this.minDate;
  sliderMaxValue = this.maxDate;

  constructor(
    private categoryService: CategoryService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.categoryService.getCategoriesOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((categories: Category[]) => {
      this.pieChartLabels = categories.map(category => [category.name]);
      // TODO asem IMPORTANT disable this stub data!!!
      this.pieChartData = categories.map(category => Math.ceil(Math.random() * 500));
      // this.pieChartData = categories.map(category => category.totalEvents);
    });
  }
}
