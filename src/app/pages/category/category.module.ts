import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbMenuModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbDialogModule, NbTabsetModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryIconComponent } from './dialog-components/category-icon/category-icon.component';

@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryIconComponent
  ],
  imports: [
    CategoryRoutingModule,
    NbIconModule,
    NbTabsetModule,
    CommonModule,
    NbMenuModule,
    NbCardModule, 
    NbInputModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class CategoryModule {
}