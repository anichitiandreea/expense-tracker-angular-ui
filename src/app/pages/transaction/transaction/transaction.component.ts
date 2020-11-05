import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { mergeMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { TransactionTypeComponent } from '../dialog-components/transaction-type/transaction-type.component';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactionGroups: any;
  constructor(
    private dialogService: NbDialogService,
    private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService
      .get()
       .pipe(
        mergeMap(transactionGroups => {
          transactionGroups.map(transactionGroup => {
            var totalDayExpense: number = 0;
            var totalDayTransaction: number = 0;

            transactionGroup.transactions.forEach(transaction => {
              if (transaction.transactionType == 1) {
                totalDayExpense += transaction.amount;
              }
              else {
                totalDayTransaction += transaction.amount;
              }
            });

            transactionGroup.todayStatistic = (totalDayTransaction - totalDayExpense).toString();
          });

          this.transactionGroups = transactionGroups;

          return EMPTY;
        })
      )
      .subscribe();
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
