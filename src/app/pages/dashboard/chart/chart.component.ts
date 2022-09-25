import { Component, OnDestroy, Input } from '@angular/core';

import { CoolTheme } from './theme';

@Component({
  selector: 'app-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ChartComponent implements OnDestroy {
  public options: any = {};
  public theme = CoolTheme;

  private themeSubscription: any;
  @Input() categories: any;
  private processedData: any;
  private processedTitles: any;

  constructor() {
  }

  ngOnChanges(changes): void {
    this.processedData = [];
    this.processedTitles = [];

    if (this.categories != undefined) {
      this.categories.forEach(category => {
        this.processedData.push({ value: category.totalAmount, name: category.name });
        this.processedTitles.push(category.name);
      });

      this.options = {
        backgroundColor: this.theme.color[2],
        color: this.theme.color,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.processedTitles,
          textStyle: {
            color: this.theme.color[2],
          },
        },
        series: [
          {
            name: 'Categories',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.processedData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: this.theme.color[3],
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: this.theme.color[1],
                },
              },
            },
          },
        ],
      };
    }
  }

  ngOnDestroy(): void {
   // this.themeSubscription.unsubscribe();
  }
}
