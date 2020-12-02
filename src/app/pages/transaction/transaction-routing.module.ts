import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionListComponent
  },
  {
    path: 'create',
    component: TransactionFormComponent
  },
  {
    path: 'edit/:id',
    component: TransactionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {
}
