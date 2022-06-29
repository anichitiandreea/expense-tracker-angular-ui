import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  styleUrls: ['./transaction-category.component.scss']
})
export class TransactionCategoryComponent implements OnInit {
  activeCategory: any;
  categories: any;

  constructor(
    private dialog: NbDialogRef<TransactionCategoryComponent>,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService
      .get()
      .subscribe(response => {
        this.categories = response;
        console.log(response)
      });
  }

  close(): void {
  	this.dialog.close();
  }

  chooseCategory(category): void {
    this.categories.forEach(function (value) {
      value.active = "";
    });

    category.active = "dialog-inner-active";
    this.activeCategory = category;
  }

  selectCategory(): void {
    this.dialog.close(this.activeCategory);
  }
}
