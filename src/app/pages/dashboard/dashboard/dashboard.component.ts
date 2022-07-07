import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { forkJoin } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { CategoryDeleteComponent } from '../../category/dialog-components/category-delete/category-delete.component';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private tasks: any = [];

  public categories: Category[];
  public fakeCategories: Category[];
  public currencyName: string;
  public totalExpense = 0;

  constructor(
    private dialogService: NbDialogService,
    private currencyService: CurrencyService,
    private transactionService: TransactionService,
    private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    let date = new Date(), currentMonth = date.getMonth(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, currentMonth, 1);
    let toDate = new Date(currentYear, currentMonth + 1, 1);
  	this.categoryService
    	.get()
    	.subscribe(response => {
    	  this.categories = response;
       
        this.categories.forEach(category => {
          this.currencyService
            .getById(category.currencyId.toString())
            .subscribe(response => {
              this.currencyName = response.name;
            })

          this.tasks.push(this.transactionService
            .getByCategoryId(category.id, fromDate.toISOString(), toDate.toISOString()));
        })

        forkJoin(this.tasks)
          .subscribe(totalAmounts => {
            for (var i = 0; i < totalAmounts.length; i ++) {
              this.categories[i].totalAmount = totalAmounts[i] as number;
              this.totalExpense += this.categories[i].totalAmount;
              this.fakeCategories = this.categories;
            }
          });
    	});
  }

  public openDeleteCategoryDialog(categoryId: string): void {
    this.dialogService.open(CategoryDeleteComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      if (!response) {
        return;
      }

      this.categoryService
        .delete(categoryId)
        .subscribe(() => {
          this.ngOnInit();
        });
    });
  }
}
