import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { currencies } from '../currency-list';

@Component({
  selector: 'app-category-currency',
  templateUrl: './category-currency.component.html',
  styleUrls: ['./category-currency.component.scss']
})
export class CategoryCurrencyComponent implements OnInit {
  currencies = currencies;
  selectedCurrency;

  constructor(protected dialogRef: NbDialogRef<CategoryCurrencyComponent>) {
  }

  ngOnInit(): void {
  }

  close(): void {
  	this.dialogRef.close();
  }

  selectCurrency(selectedCurrency: any): void {
    this.currencies.forEach(function (value) {
      value.checked = false;
    });

    selectedCurrency.checked = true;

    this.dialogRef.close(selectedCurrency);
  }
}
