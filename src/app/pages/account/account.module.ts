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
export class AccountModule {
}
