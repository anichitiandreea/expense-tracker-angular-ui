import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ChartComponent implements OnDestroy {
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

    if (this.categories != undefined) {
      this.categories.forEach(category => {
        this.processedData.push({ value: category.totalAmount, name: category.name });
        this.processedTitles.push(category.name);
      });

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors = config.variables;
        //const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: config.variables.bg,
          color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.processedTitles,
            textStyle: {
              color: config.variables.fgText,
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
                    color: config.variables.fgText,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: config.variables.fgText,
                  },
                },
              },
            },
          ],
        };
      });
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
