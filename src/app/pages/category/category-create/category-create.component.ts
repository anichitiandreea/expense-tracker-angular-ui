import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CategoryIconComponent } from '../dialog-components/category-icon/category-icon.component';
import { CategoryCurrencyComponent } from '../dialog-components/category-currency/category-currency.component';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  iconName: string;
  iconColor: string;
  currency: string;
  constructor(private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
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
}
