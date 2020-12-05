import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { NbDialogService } from '@nebular/theme';

import { Transaction } from 'src/app/model/transaction';
import { CurrencyService } from 'src/app/services/currency.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';
import { TransactionAccountComponent } from '../dialog-components/transaction-account/transaction-account.component';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  form: FormGroup;
  category: any;
  transaction: any;
  transactionId = this.route.snapshot.params['id'];
  account: any;
  amountPlaceholder: string = "Amount";
  currencyName: string;

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private dialogService: NbDialogService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
  	this.buildForm();
    if (this.transactionId) {
      this.getTransactionById();
    }
  }

  getTransactionById(): void {
    this.transactionService
      .getById(this.transactionId)
      .subscribe(response => {
        this.transaction = response;
        this.category = response.category;
        this.account = response.account;
        this.form.patchValue({
          date: new Date(response.transactionDate),
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
    this.dialogService
      .open(TransactionCategoryComponent, {
        autoFocus: false,
        closeOnBackdropClick: false
      })
      .onClose
      .subscribe(response => {
        if (response) {
          this.category = response;
          this.currencyService
            .getById(this.category.currencyId)
            .subscribe(response => {
              this.currencyName = response.name;
              this.amountPlaceholder = `Amount (${response.name})`;
            })
        }
      });
  }

  openAccountDialog(): void {
    this.dialogService
      .open(TransactionAccountComponent, {
        autoFocus: false,
        closeOnBackdropClick: false
      })
      .onClose
      .subscribe(response => {
        if (response) {
          this.account = response;
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    var transactionDate = new Date(this.form.value.date.getTime() - (this.form.value.date.getTimezoneOffset() * 60000)).toISOString();

    let transaction: Transaction = {
      amount: parseFloat(this.form.value.amount),
      currencyName: (this.currencyName) ? this.currencyName : this.transaction.currencyName,
      note: this.form.value.note,
      transactionDate: transactionDate,
      accountId: this.account.id,
      categoryId: this.category.id,
      id: undefined,
      transactionType: 1
    }

    if (this.transactionId) {
      transaction.id = this.transactionId;
      this.transactionService
        .update(JSON.stringify(transaction))
        .subscribe(response => {
          this.router.navigate(["/transactions"]);
        });
    }
    else {
      this.transactionService
        .create(JSON.stringify(transaction))
        .subscribe(response => {
          this.router.navigate(["/transactions"]);
        })
    }
  }
}
