import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NbDialogService } from '@nebular/theme';

import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService,
    private location: Location) {
  	
  }

  ngOnInit(): void {
  }

  openCategoryDialog(): void {
    this.dialogService.open(TransactionCategoryComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
    });
  }

  goBack(): void {
    this.location.back();
  }

}
