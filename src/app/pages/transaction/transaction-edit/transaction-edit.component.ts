import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NbDialogService } from '@nebular/theme';

import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionAccountComponent } from '../dialog-components/transaction-account/transaction-account.component';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {
  form: FormGroup;
  category: any;
  account: any;

  constructor(
    private dialogService: NbDialogService,
    private location: Location,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private route: ActivatedRoute) {
  	
  }

  ngOnInit(): void {
    this.buildForm();
    this.transactionService
      .getById(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.category = response.category;
        this.account = response.account;
        this.form.patchValue({
          date: response.transactionDate,
          amount: response.amount,
          note: response.note
        })
      })
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
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      this.category = response;
    });
  }

  openAccountDialog(): void {
    this.dialogService.open(TransactionAccountComponent, {
      autoFocus: false,
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
      id: this.route.snapshot.params['id'],
      transactionType: 1
    }

    this.transactionService
      .update(JSON.stringify(transaction))
      .subscribe(response => {
      });
  }
}
