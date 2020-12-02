import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any;
  currencyName: string;

  constructor(
    private currencyService: CurrencyService,
    private transactionService: TransactionService,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    let date = new Date(), currentMonth = date.getMonth(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, currentMonth, 1);
    let toDate = new Date(currentYear, currentMonth + 1, 1);
  	this.categoryService
  	.get()
  	.subscribe(response => {
  	  this.categories = response;
      this.categories.forEach(category => {
        this.currencyService
          .getById(category.currencyId)
          .subscribe(response => {
            this.currencyName = response.name;
          })

        this.transactionService
          .getByCategoryId(category.id, fromDate.toISOString(), toDate.toISOString())
          .subscribe(response => {
            category.totalAmount = response;
          })
      })
  	});
  }
}
