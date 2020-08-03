import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbMenuModule, NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule } from '@nebular/theme';

import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionCreateComponent
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    NbMenuModule, 
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule
  ]
})
export class TransactionModule {
}