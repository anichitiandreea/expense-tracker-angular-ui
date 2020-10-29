import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NbDialogService } from '@nebular/theme';

import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';
import { TransactionAccountComponent } from '../dialog-components/transaction-account/transaction-account.component';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  form: FormGroup;
  category: any;
  account: any;

  constructor(
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private dialogService: NbDialogService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
  	this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      note: ['', [Validators.required]]
    });
  }

  openCategoryDialog(): void {
    this.dialogService.open(TransactionCategoryComponent, {
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      this.category = response;
    });
  }

  openAccountDialog(): void {
    this.dialogService.open(TransactionAccountComponent, {
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      this.account = response;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    let transaction: Transaction = {
      amount: this.form.value.amount,
      note: this.form.value.note,
      transactionDate: this.form.value.date,
      accountId: this.account.id,
      categoryId: this.category.id,
      id: undefined,
      transactionType: 1
    }

    this.transactionService
      .create(JSON.stringify(transaction))
      .subscribe(response => {
        console.log(response)
      })
  }
}
