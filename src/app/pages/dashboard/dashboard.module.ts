import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent,
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class DashboardModule {
}
