import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class MonthlyCategoryExpenseComponent implements OnDestroy {
  public options: any = {};

  private themeSubscription: any;
  @Input() categories: any;
  private processedData: number[];
  private processedTitles: string[];

  constructor() {}

  public ngOnChanges(changes): void {
    this.processedData = [];
    this.processedTitles = [];

    if (!this.categories) {
      return;
    }

    this.categories.forEach(category => {
      this.processedData.push(category.totalAmount);
      this.processedTitles.push(category.categoryName);
    });

    /*this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;

      this.options = {
        backgroundColor: config.variables.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.processedTitles,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: config.variables.fgText,
              },
            },
            axisLabel: {
              textStyle: {
                color: config.variables.fgText,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: config.variables.fgText,
              },
            },
            splitLine: {
              lineStyle: {
                color: config.variables.separator,
              },
            },
            axisLabel: {
              textStyle: {
                color: config.variables.fgText,
              },
            },
          },
        ],
        series: [
          {
            name: 'Amount spent',
            type: 'bar',
            barWidth: '60px',
            data: this.processedData,
          },
        ],
      };
    });*/
  }

  public ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
