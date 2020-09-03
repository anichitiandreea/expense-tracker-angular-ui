import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  styleUrls: ['./transaction-category.component.scss']
})
export class TransactionCategoryComponent implements OnInit {
  list = [
		{name: "Cumparaturi", active: ""},
		{name: "Mancare", active: ""},
		{name: "Bere", active: ""},
		{name: "Caine", active: ""},
	  {name: "Baie", active: ""},
		{name: "Fitness", active: ""},
	]
  activeCategory: any;

  constructor(private dialog: NbDialogRef<TransactionCategoryComponent>) {
  }

  ngOnInit(): void {
  }

  close(): void {
  	this.dialog.close();
  }

  chooseCategory(category): void {
    this.list.forEach(function (value) {
      value.active = "";
    });

    category.active = "category-active";
    this.activeCategory = category
  }

  selectCategory(): void {
    this.dialog.close(this.activeCategory);
  }
}
