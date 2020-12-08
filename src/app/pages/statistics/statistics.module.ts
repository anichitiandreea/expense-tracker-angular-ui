import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    StatisticsRoutingModule,
    NbIconModule,
    CommonModule,
    NbMenuModule,
    NbCardModule, 
    NbButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class StatisticsModule {
}
