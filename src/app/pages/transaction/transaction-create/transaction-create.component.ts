import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
  	this.buildForm();
  }

  buildForm(): void {
  	/*this.form = this.formBuilder.group({
      apiCallsPerDayLimit: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      creditsPerMonthLimit: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      processingSizePerMonthLimit: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1)]],
    });*/
  }

  openCategoryDialog(): void {
    this.dialogService.open(TransactionCategoryComponent, {
      closeOnBackdropClick: false
    })
    .onClose
    .subscribe(response => {
      console.log(response)
    });
  }
}
