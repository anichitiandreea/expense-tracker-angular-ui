import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryIconComponent } from '../dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from '../dialog-components/category-currency/category-currency.component';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { iconList } from '../../category/dialog-components/icon-list';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  iconName: string;
  iconColor: string;
  currency: any;
  categoryId = this.route.snapshot.params['id'];
  category: any;

  constructor(
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();

    if(this.categoryId === undefined) {
      return;
    }

    this.categoryService
      .getById(this.categoryId)
      .subscribe(response => {
        this.category = response;
        this.iconName = this.category.icon;
        this.iconColor = this.category.iconColor;
        this.form.patchValue(response);
        this.currencyService
          .getById(this.category.currencyId)
          .subscribe(response => {
            this.currency = response;
          })
      })
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  openIconDialog(): void {
    this.dialogService.open(CategoryIconComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      context: { iconList: iconList },
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
      this.currency = response;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    var category: Category = {
      name: this.form.value.name,
      icon: this.iconName,
      iconColor: this.iconColor,
      currencyId: this.currency.id,
      id: undefined
    }

    if (this.categoryId) {
      category.id = this.categoryId;
      this.categoryService
        .update(JSON.stringify(category))
        .subscribe(response => {
          this.router.navigate(["/dashboard"]);
        });
    }

    this.categoryService
      .create(JSON.stringify(category))
      .subscribe(response => {
        this.router.navigate(["/dashboard"]);
      });
  }
}
