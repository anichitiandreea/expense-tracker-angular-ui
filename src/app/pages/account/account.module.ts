import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxEchartsModule } from 'ngx-echarts';
import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountDeleteComponent } from './dialog-components/account-delete/account-delete.component';

@NgModule({
  declarations: [
  AccountListComponent,
  AccountFormComponent,
  AccountDeleteComponent
  ],
  imports: [
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ]
})
export class AccountModule {
}
