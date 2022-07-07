import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Currency } from 'src/app/model/currency';

import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-category-currency',
  templateUrl: './category-currency.component.html',
  styleUrls: ['./category-currency.component.scss']
})
export class CategoryCurrencyComponent implements OnInit {
  public currencies: Currency[];
  public selectedCurrency: Currency;

  constructor(
    private dialog: NbDialogRef<CategoryCurrencyComponent>,
    private currencyService: CurrencyService) {
  }

  public ngOnInit(): void {
    this.currencyService
      .get()
      .subscribe(response => {
        this.currencies = response;
      })
  }

  public close(): void {
  	this.dialog.close();
  }

  public selectCurrency(selectedCurrency: Currency): void {
    this.currencies.forEach(function (value) {
      value.checked = false;
    });

    selectedCurrency.checked = true;

    this.dialog.close(selectedCurrency);
  }
}
