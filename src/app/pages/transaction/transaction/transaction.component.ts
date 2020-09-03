import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { TransactionTypeComponent } from '../dialog-components/transaction-type/transaction-type.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
  }

  openTransactionTypeDialog(): void {
    this.dialogService.open(TransactionTypeComponent, {
    	closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
    });
  }
}
