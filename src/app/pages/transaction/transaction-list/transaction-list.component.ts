import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { mergeMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { TransactionTypeComponent } from '../dialog-components/transaction-type/transaction-type.component';
import { TransactionDeleteComponent } from '../dialog-components/transaction-delete/transaction-delete.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionGroups: any;
  pageTransactions: any = [];
  lastTransactionDate: string;
  exchanges: any;
  pageInformation = {
    transactions: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
    hasMore: true
  };
  pageSize = 10;

  constructor(
    private currencyService: CurrencyService,
    private dialogService: NbDialogService,
    private transactionService: TransactionService) {
  }

  ngOnInit(): void {
  }

  openTransactionTypeDialog(): void {
    this.dialogService.open(TransactionTypeComponent, {
      autoFocus: false,
    	closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
    });
  }

  openDeleteTransactionDialog(transactionId: string): void {
    this.dialogService.open(TransactionDeleteComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      if (response) {
        this.transactionService
          .delete(transactionId)
          .subscribe(response => {
            this.ngOnInit();
          });
      }
    });
  }

  loadNextPage(pageInformation): void {

    if (!pageInformation.hasMore) {
      return;
    }

    if (pageInformation.loading) { return }

    pageInformation.loading = true;
    pageInformation.placeholders = new Array(this.pageSize);
    this.currencyService
      .exchangeToRON()
      .pipe(
        mergeMap(response => {
          this.exchanges = response;

          return this.transactionService.get(pageInformation.pageToLoadNext, this.pageSize);
        })
      )
      .subscribe(transactionGroups => {
        transactionGroups.map(transactionGroup => {
          var totalDayExpense: number = 0;
          var totalDayTransaction: number = 0;

          transactionGroup.transactions.forEach(transaction => {
            if (transaction.transactionType == 1) {
              if (transaction.currencyName != "RON") {
                let currencyRate = this.exchanges.rates[transaction.currencyName];
                totalDayExpense += transaction.amount / currencyRate;
              }
              else {
                totalDayExpense += transaction.amount;
              }
            }
            else {
              if (transaction.currencyName != "RON") {
                let currencyRate = this.exchanges.rates[transaction.currencyName];
                totalDayTransaction += transaction.amount / currencyRate;
              }
              else {
                totalDayTransaction += transaction.amount;
              }
            }
          });

          var transactionGroupHeader = {
            todayStatistic: (totalDayTransaction - totalDayExpense).toFixed(2).toString(),
            transactionDate: transactionGroup.transactionDate,
            isHeader: true
          }

          if (this.lastTransactionDate != transactionGroupHeader.transactionDate) {
            pageInformation.transactions.push(transactionGroupHeader);
          }

          this.lastTransactionDate = transactionGroupHeader.transactionDate;

          transactionGroup.transactions.forEach(transaction => {
            pageInformation.transactions.push(transaction);
          });

        });

        if (transactionGroups.length == 0) {
          pageInformation.hasMore = false;
        }

        pageInformation.placeholders = [];
        pageInformation.loading = false;
        pageInformation.pageToLoadNext++;
      });
  }
}
