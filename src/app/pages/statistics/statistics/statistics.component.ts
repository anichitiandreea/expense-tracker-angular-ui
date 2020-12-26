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
    console.log(this.dailyExpense);
  }
}
