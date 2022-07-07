import { Component, OnInit } from '@angular/core';

import { StatisticsService } from 'src/app/services/statistics.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	public categories: Category[];
  public dailyExpense: string;
  public currencyName: string;

  public currentMonth: number = new Date().getMonth();
  public statisticsMonth: number = new Date().getMonth();
  public statisticsYear: number = new Date().getFullYear();
  public currentYear: number = new Date().getFullYear();
  public monthList: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private statisticsService: StatisticsService,
    private currencyService: CurrencyService) {
  }

  public ngOnInit(): void {
  	let date = new Date(), currentMonth = date.getMonth(), currentYear = date.getFullYear();

    let fromDate = new Date(currentYear, currentMonth, 1);
    let toDate = new Date(currentYear, currentMonth + 1, 1);

    this.statisticsService.get(fromDate.toISOString(), toDate.toISOString())
      .subscribe(response => {
        this.categories = response;
        this.setDailyExpense();

        this.currencyService
          .getById(this.categories[0].currencyId.toString())
            .subscribe(response => {
              this.currencyName = response.name;
            })
      });
  }

  private setDailyExpense(): void {
    var totalMonthExpense = 0;
    this.categories.forEach(category => {
      totalMonthExpense += category.totalAmount;
    });

    this.dailyExpense = (totalMonthExpense / 30).toFixed(2);
  }

  public loadNextMonth(): void {
    this.statisticsMonth += 1;
    if (this.statisticsMonth == 12) {
      this.statisticsMonth = 0;
      this.statisticsYear += 1;
    }

    this.getMonthlyCategoryExpense();
  }

  public loadLastMonth(): void {
    this.statisticsMonth -= 1;
    if (this.statisticsMonth == -1) {
      this.statisticsMonth = 11;
      this.statisticsYear -= 1;
    }

    this.getMonthlyCategoryExpense();
  }

  private getMonthlyCategoryExpense(): void {
    let date = new Date(), currentYear = date.getFullYear();
    
    let fromDate = new Date(currentYear, this.statisticsMonth, 1);
    let toDate = new Date(currentYear, this.statisticsMonth + 1, 1);

    this.statisticsService
      .get(fromDate.toISOString(), toDate.toISOString())
        .subscribe(response => {
          this.categories = response;
          this.setDailyExpense();
        });
  }
}
