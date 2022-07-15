import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { MonthlyCategoryExpenseComponent } from './charts/monthly-category-expense.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    MonthlyCategoryExpenseComponent
  ],
  imports: [
    StatisticsRoutingModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class StatisticsModule {
}
