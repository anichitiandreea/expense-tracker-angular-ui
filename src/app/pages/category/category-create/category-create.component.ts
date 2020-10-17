import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryIconComponent } from '../dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from '../dialog-components/category-currency/category-currency.component';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup;
  iconName: string;
  iconColor: string;
  currency: string;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  openIconDialog(): void {
    this.dialogService.open(CategoryIconComponent, {
    	closeOnBackdropClick: false
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
      this.currency = response.value;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    var category: Category = {
      name: this.form.value.name,
      icon: this.iconName,
      iconColor: this.iconColor,
      currencyName: this.currency
    }

    console.log(category)

    this.categoryService
      .create(JSON.stringify(category))
      .subscribe(response => {

      });
  }
}
