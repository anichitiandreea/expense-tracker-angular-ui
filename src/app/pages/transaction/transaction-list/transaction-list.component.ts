import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { mergeMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { TransactionTypeComponent } from '../dialog-components/transaction-type/transaction-type.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionGroups: any;
  exchanges: any;
  constructor(
    private currencyService: CurrencyService,
    private dialogService: NbDialogService,
    private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.currencyService
      .exchangeToRON()
      .pipe(
        mergeMap(response => {
          this.exchanges = response;

          return this.transactionService.get();
        })
      )
      .subscribe(transactionGroups => {
        transactionGroups.map(transactionGroup => {
          console.log(transactionGroup)
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

          transactionGroup.todayStatistic = (totalDayTransaction - totalDayExpense).toFixed(2).toString();
        });

        this.transactionGroups = transactionGroups;
      });
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
}
