import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { NbDialogService } from '@nebular/theme';

import { CategoryCurrencyComponent } from '../../category/dialog-components/category-currency/category-currency.component';
import { CategoryIconComponent } from '../../category/dialog-components/category-icon/category-icon.component';

import { accountIconList } from '../../category/dialog-components/account-icon-list';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
	accountId: any;
	currency: any;
	iconColor: any;
	iconName: any;
	form: FormGroup;

  constructor(
  	private formBuilder: FormBuilder,
  	private dialogService: NbDialogService,
  	private location: Location) {

  }

  ngOnInit(): void {
  	this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [''],
    });
  }

  onSubmit() {

  }

  goBack() {
  	this.location.back();
  }

  openIconDialog(): void {
  	this.dialogService.open(CategoryIconComponent, {
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
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      this.currency = response;
    });
  }
}
