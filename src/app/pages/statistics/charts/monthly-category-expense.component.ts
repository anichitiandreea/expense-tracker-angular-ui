import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class MonthlyCategoryExpenseComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;
  @Input() categories: any;
  processedData: any;
  processedTitles: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnChanges(changes): void {
    this.processedData = [];
    this.processedTitles = [];

    if (!this.categories) {
      return;
    }

    this.categories.forEach(category => {
      this.processedData.push(category.categoryAmount);
      this.processedTitles.push(category.categoryName);
    });
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
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
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
