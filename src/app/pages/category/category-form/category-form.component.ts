import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryIconComponent } from '../dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from '../dialog-components/category-currency/category-currency.component';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { iconList } from '../../category/dialog-components/icon-list';
import { Currency } from 'src/app/model/currency';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public form: UntypedFormGroup;
  public iconName: string;
  public iconColor: string;
  public currency: Currency;
  public categoryId = this.route.snapshot.params['id'];
  public category: Category;

  constructor(
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private formBuilder: UntypedFormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.buildForm();

    if (this.categoryId === undefined) {
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
          .getById(this.category.currencyId.toString())
          .subscribe(response => {
            this.currency = response;
          })
      })
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  public openIconDialog(): void {
    /*this.dialogService.open(CategoryIconComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      context: { iconList: iconList },
    })
    .onClose
    .subscribe(response => {
      if (response) {
        this.iconName = (response.iconName != undefined)
          ? response.iconName
          : this.iconName;

        this.iconColor = (response.iconColor != undefined)
          ? response.iconColor
          : this.iconColor;
      }
    });*/
  }

  public openCurrencyDialog(): void {
    /*this.dialogService.open(CategoryCurrencyComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      if (response) {
        this.currency = response;
      }
    });*/
  }

  public goBack(): void {
    this.location.back();
  }

  public onSubmit(): void {
    var category: Category = {
      name: this.form.value.name,
      icon: this.iconName,
      iconColor: this.iconColor,
      currencyId: this.currency.id,
      id: undefined,
      totalAmount: undefined
    }

    if (this.categoryId) {
      category.id = this.categoryId;
      this.categoryService
        .update(JSON.stringify(category))
        .subscribe(() => {
          this.router.navigate(["/dashboard"]);
        });
    }

    this.categoryService
      .create(JSON.stringify(category))
      .subscribe(() => {
        this.router.navigate(["/dashboard"]);
      });
  }
}
