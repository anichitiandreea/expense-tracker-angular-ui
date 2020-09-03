import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';

import { TransactionCategoryComponent } from '../dialog-components/transaction-category/transaction-category.component';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
  	this.buildForm();
  }

  buildForm(): void {
  }

  openCategoryDialog(): void {
    this.dialogService.open(TransactionCategoryComponent, {
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
