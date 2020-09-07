import { Component, OnInit } from '@angular/core';

import { NbDialogService } from '@nebular/theme';

import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {

  constructor(private dialogService: NbDialogService) {
  	
  }

  ngOnInit(): void {
  }

  openCategoryDialog(): void {
    this.dialogService.open(TransactionCategoryComponent, {
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
    });
  }

}
