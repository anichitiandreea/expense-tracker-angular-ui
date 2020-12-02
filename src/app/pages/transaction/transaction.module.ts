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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionTypeComponent } from './dialog-components/transaction-type/transaction-type.component';
import { TransactionCategoryComponent } from './dialog-components/transaction-category/transaction-category.component';
import { TransactionAccountComponent } from './dialog-components/transaction-account/transaction-account.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionFormComponent,
    TransactionTypeComponent,
    TransactionCategoryComponent,
    TransactionAccountComponent
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
