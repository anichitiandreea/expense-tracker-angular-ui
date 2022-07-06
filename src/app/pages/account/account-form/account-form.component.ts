import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { NbDialogService } from '@nebular/theme';

import { CategoryCurrencyComponent } from '../../category/dialog-components/category-currency/category-currency.component';
import { CategoryIconComponent } from '../../category/dialog-components/category-icon/category-icon.component';
import { AccountService } from 'src/app/services/account.service';
import { accountIconList } from '../../category/dialog-components/account-icon-list';
import { CurrencyService } from 'src/app/services/currency.service';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
	currency: any;
	iconColor: any;
	iconName: any;
  account: any;
	form: UntypedFormGroup;
  accountId = this.route.snapshot.params['id'];

  constructor(
    private currencyService: CurrencyService,
    private router: Router,
  	private formBuilder: UntypedFormBuilder,
  	private dialogService: NbDialogService,
  	private location: Location,
    private route: ActivatedRoute,
    private accountService: AccountService) {

  }

  ngOnInit(): void {
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
          .getById(this.account.currencyId)
          .subscribe(response => {
            this.currency = response;
          })
      })
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [''],
    });
  }

  onSubmit() {
    var account: Account = {
      name: this.form.value.name,
      amount: this.form.value.amount.toString(),
      icon: this.iconName,
      iconColor: this.iconColor,
      currencyId: this.currency.id,
      currencyName: this.currency.name,
      id: undefined
    };

    if (this.accountId) {
      account.id = this.accountId;
      this.accountService
        .update(JSON.stringify(account))
        .subscribe(response => {
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

  goBack(): void {
  	this.location.back();
  }

  openIconDialog(): void {
  	this.dialogService.open(CategoryIconComponent, {
      autoFocus: false,
    	closeOnBackdropClick: false,
    	context: { iconList: accountIconList },
    })
    .onClose
    .subscribe(response => {
    	this.iconName = (response.iconName != undefined) 
      ? response.iconName 
      : this.iconName;
      
    	this.iconColor = (response.iconColor != undefined) 
      ? response.iconColor 
      : this.iconColor;
    });
  }

  openCurrencyDialog(): void {
  	this.dialogService.open(CategoryCurrencyComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      if (response) {
        this.currency = response;
      }
    });
  }
}
