import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { 
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbDialogModule,
  NbUserModule,
  NbDatepickerModule
} from '@nebular/theme';

import { FormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionTypeComponent } from './dialog-components/transaction-type/transaction-type.component';
import { TransactionCategoryComponent } from './dialog-components/transaction-category/transaction-category.component';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionCreateComponent,
    TransactionTypeComponent,
    TransactionCategoryComponent
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    FormsModule,
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
    NbDialogModule.forChild(),
    NbUserModule,
    NbDatepickerModule
  ]
})
export class TransactionModule {
}
