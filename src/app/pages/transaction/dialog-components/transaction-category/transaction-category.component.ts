import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  styleUrls: ['./transaction-category.component.scss']
})
export class TransactionCategoryComponent implements OnInit {
  public activeCategory: any;
  public categories: any;

  constructor(
    private dialog: NbDialogRef<TransactionCategoryComponent>,
    private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.categoryService
      .get()
      .subscribe(response => {
        this.categories = response;
      });
  }

  public close(): void {
  	this.dialog.close();
  }

  public chooseCategory(category): void {
    this.categories.forEach(function (value) {
      value.active = "";
    });

    category.active = "dialog-inner-active";
    this.activeCategory = category;
  }

  public selectCategory(): void {
    this.dialog.close(this.activeCategory);
  }
}
