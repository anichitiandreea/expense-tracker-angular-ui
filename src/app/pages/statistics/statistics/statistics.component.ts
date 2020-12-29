import { Component, OnInit } from '@angular/core';

import { mergeMap } from 'rxjs/operators';

import { StatisticsService } from 'src/app/services/statistics.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	categories: any;
  exchanges: any;
  dailyExpense: string;
  currentMonth = new Date().getMonth();
  statisticsMonth = new Date().getMonth();
  statisticsYear = new Date().getFullYear();
  currentYear = new Date().getFullYear();
  monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private statisticsService: StatisticsService,
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
  	let date = new Date(), currentMonth = date.getMonth(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, currentMonth, 1);
    let toDate = new Date(currentYear, currentMonth + 1, 1);

    this.currencyService
      .exchangeToRON()
      .pipe(
        mergeMap(response => {
          this.exchanges = response;

          return this.statisticsService.get(fromDate.toISOString(), toDate.toISOString());
        })
      )
      .subscribe(response => {
        this.categories = response;
        this.exchangeToLei();
      });
  }

  exchangeToLei(): void {
    var totalMonthExpense = 0;
    this.categories.forEach(category => {
      if (category.categoryCurrency != "RON") {
        let currencyRate = this.exchanges.rates[category.categoryCurrency];
        totalMonthExpense += category.categoryAmount / currencyRate;
      }
    });

    this.dailyExpense = (totalMonthExpense / 30).toFixed(2);
  }

  loadNextMonth(): void {
    this.statisticsMonth += 1;
    if ( this.statisticsMonth == 12) {
      this.statisticsMonth = 0;
      this.statisticsYear +=1;
    }

    let date = new Date(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, this.statisticsMonth, 1);
    let toDate = new Date(currentYear, this.statisticsMonth + 1, 1);

    this.statisticsService
      .get(fromDate.toISOString(), toDate.toISOString())
      .subscribe(response => {
        this.categories = response;
      });
  }

  loadLastMonth(): void {
    this.statisticsMonth -= 1;
    if ( this.statisticsMonth == -1) {
      this.statisticsMonth = 11;
      this.statisticsYear -=1;
    }

    let date = new Date(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, this.statisticsMonth, 1);
    let toDate = new Date(currentYear, this.statisticsMonth + 1, 1);

    this.statisticsService
      .get(fromDate.toISOString(), toDate.toISOString())
      .subscribe(response => {
        this.categories = response;
      });
  }
}
