import { Component, OnInit } from '@angular/core';

import { DialogRef } from 'src/app/dialog/dialog-ref';
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
  public selectedCurrencyId: number;

  constructor(
    private currencyService: CurrencyService,
    private dialog: DialogRef) {
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

  public selectCurrency(selectedCurrencyId: number): void {
    this.currencies.forEach(function (value) {
      if (value.id === selectedCurrencyId) {
        value.checked = true;
        this.selectedCurrency = value;
      }
      value.checked = false;
    }, this);

    this.dialog.close(this.selectedCurrency);
  }
}
