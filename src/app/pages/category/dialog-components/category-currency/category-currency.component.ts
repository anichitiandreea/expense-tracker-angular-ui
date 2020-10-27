import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-category-currency',
  templateUrl: './category-currency.component.html',
  styleUrls: ['./category-currency.component.scss']
})
export class CategoryCurrencyComponent implements OnInit {
  currencies;
  selectedCurrency;

  constructor(private dialog: NbDialogRef<CategoryCurrencyComponent>,
    private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService
      .get()
      .subscribe(response => {
        this.currencies = response;
      })
  }

  close(): void {
  	this.dialog.close();
  }

  selectCurrency(selectedCurrency: any): void {
    console.log(selectedCurrency)
    this.currencies.forEach(function (value) {
      value.checked = false;
    });

    selectedCurrency.checked = true;

    this.dialog.close(selectedCurrency);
  }
}
