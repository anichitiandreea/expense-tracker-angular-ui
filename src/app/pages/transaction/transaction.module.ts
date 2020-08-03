import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbMenuModule, NbButtonModule } from '@nebular/theme';

import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    TransactionComponent,
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    NbButtonModule,
    NbMenuModule
  ]
})
export class TransactionModule {
}