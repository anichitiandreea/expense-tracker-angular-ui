import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryCurrencyComponent } from '../../category/dialog-components/category-currency/category-currency.component';
import { CategoryIconComponent } from '../../category/dialog-components/category-icon/category-icon.component';
import { AccountService } from 'src/app/services/account.service';
import { accountIconList } from '../../category/dialog-components/account-icon-list';
import { CurrencyService } from 'src/app/services/currency.service';
import { Account } from 'src/app/model/account';
import { Currency } from 'src/app/model/currency';
import { DialogService } from 'src/app/dialog/dialog.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
	public currency: Currency;
	public iconColor: string;
	public iconName: string;
  public account: Account;
	public form: UntypedFormGroup;
  public accountId = this.route.snapshot.params['id'];

  constructor(
    private currencyService: CurrencyService,
    private router: Router,
  	private formBuilder: UntypedFormBuilder,
  	private location: Location,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dialogService: DialogService) {
  }

  public ngOnInit(): void {
  	this.buildForm();

    if (this.accountId === undefined) {
      return;
    }

    this.accountService
      .getById(this.accountId)
      .subscribe(response => {
        this.account = response;
        this.iconName = this.account.icon;
        this.iconColor = this.account.iconColor;
        this.form.patchValue(response);

        this.currencyService
          .getById(this.account.currencyId.toString())
          .subscribe(response => {
            this.currency = response;
          })
      })
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [''],
    });
  }

  public onSubmit(): void {
    var account: Account = {
      name: this.form.value.name,
      amount: this.form.value.amount.toString(),
      icon: this.iconName,
      iconColor: this.iconColor,
      currencyId: this.currency.id,
      currencyName: this.currency.name,
      id: undefined,
      isDeleted: false,
      transactions: null
    };

    if (this.accountId) {
      account.id = this.accountId;
      this.accountService
        .update(JSON.stringify(account))
        .subscribe(() => {
          this.router.navigate(["/accounts"]);
        });
    }
    else {
      this.accountService
        .create(JSON.stringify(account))
        .subscribe(() => {
          this.router.navigate(["/accounts"]);
        });
    }
  }

  public goBack(): void {
  	this.location.back();
  }

  public openIconDialog(): void {
  	const ref = this.dialogService.open(CategoryIconComponent, {});
    
    ref.afterClosed.subscribe(response => {
    	this.iconName = (response.iconName != undefined) 
        ? response.iconName 
        : this.iconName;
      
    	this.iconColor = (response.iconColor != undefined) 
        ? response.iconColor 
        : this.iconColor;
    });
  }

  public openCurrencyDialog(): void {
  	const ref = this.dialogService.open(CategoryCurrencyComponent, {});

    ref.afterClosed.subscribe(response => {
      if (response) {
        this.currency = response;
      }
    });
  }
}
