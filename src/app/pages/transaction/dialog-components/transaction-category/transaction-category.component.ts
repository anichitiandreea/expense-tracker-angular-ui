import { Component, OnInit } from '@angular/core';

import { DialogRef } from 'src/app/dialog/dialog-ref';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  styleUrls: ['./transaction-category.component.scss']
})
export class TransactionCategoryComponent implements OnInit {
  public activeCategory: any;
  public categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: DialogRef) {
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
