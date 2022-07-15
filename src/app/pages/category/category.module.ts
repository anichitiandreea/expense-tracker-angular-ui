import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxEchartsModule } from 'ngx-echarts';
import { CategoryRoutingModule } from './category-routing.module';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryIconComponent } from './dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from './dialog-components/category-currency/category-currency.component';
import { CategoryDeleteComponent } from './dialog-components/category-delete/category-delete.component';

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryIconComponent,
    CategoryCurrencyComponent,
    CategoryDeleteComponent
  ],
  imports: [
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class CategoryModule {
}
