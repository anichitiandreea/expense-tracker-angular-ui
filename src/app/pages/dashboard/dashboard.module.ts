import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule
} from '@nebular/theme';

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
    NbIconModule,
    CommonModule,
    NbMenuModule,
    NbCardModule, 
    NbButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class DashboardModule {
}
