import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {CategoryService} from '../../../services/category/category.service';
import {take} from 'rxjs/operators';
import {Category} from '../../../models/Category';

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
