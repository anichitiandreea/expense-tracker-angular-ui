import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
  NbTabsetModule,
  NbRadioModule
} from '@nebular/theme';

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