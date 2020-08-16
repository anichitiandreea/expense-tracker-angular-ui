import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

    ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
console.log(config)
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
          data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
          textStyle: {
            color: config.variables.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
            ],
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
                  color: config.variables.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: config.variables.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
