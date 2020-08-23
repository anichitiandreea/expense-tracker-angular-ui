import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbMenuModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbDialogModule, NbTabsetModule, NbRadioModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryIconComponent } from './dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from './dialog-components/category-currency/category-currency.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryIconComponent,
    CategoryCurrencyComponent
  ],
  imports: [
    CategoryRoutingModule,
    NbIconModule,
    FormsModule,
    NbTabsetModule,
    CommonModule,
    NbMenuModule,
    NbCardModule,
    NbRadioModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class CategoryModule {
}