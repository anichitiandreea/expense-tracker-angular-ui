import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionTypeComponent } from '../dialog-components/transaction-type/transaction-type.component';
import { TransactionDeleteComponent } from '../dialog-components/transaction-delete/transaction-delete.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  public transactionGroups: any;
  public pageTransactions: Transaction[] = [];
  public lastTransactionDate: string;
  public pageInformation = {
    transactions: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
    hasMore: true
  };
  public transactions: any = [];
  public pageSize: number = 10;

  constructor(
    private transactionService: TransactionService,
    private router: Router) {
  }

  public openTransactionTypeDialog(): void {
    /*this.dialogService.open(TransactionTypeComponent, {
      autoFocus: false,
    	closeOnBackdropClick: false
    })
    .onClose
    .subscribe(() => {
    });*/
  }

  public openDeleteTransactionDialog(transactionId: string): void {
    /*this.dialogService.open(TransactionDeleteComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      if (!response) {
        return;
      }

      this.transactionService
        .delete(transactionId)
        .subscribe(() => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/transactions"]));
        });
    });*/
  }

  public ngOnInit(): void {
    this.transactionService.get(1, this.pageSize)
      .subscribe(transactionGroups => {
        transactionGroups.map(transactionGroup => {
          var totalDayExpense: number = 0;
          var totalDayTransaction: number = 0;

          transactionGroup.transactions.forEach(transaction => {
            if (transaction.transactionType == 1) {
                totalDayExpense += transaction.amount;
              }
            else {
              totalDayTransaction = transaction.amount;
            }
          });

          var transactionGroupHeader = {
            todayStatistic: (totalDayTransaction - totalDayExpense).toFixed(2).toString(),
            transactionDate: transactionGroup.transactionDate,
            transactionGroupCurrency: transactionGroup.transactions[0].currencyName,
            isHeader: true
          }

          if (this.lastTransactionDate != transactionGroupHeader.transactionDate) {
            this.transactions.push(transactionGroupHeader);
          }

          this.lastTransactionDate = transactionGroupHeader.transactionDate;

          transactionGroup.transactions.forEach(transaction => {
            this.transactions.push(transaction);
          });

        });
      });
  }
}
