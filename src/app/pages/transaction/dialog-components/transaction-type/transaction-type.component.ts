import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.scss']
})
export class TransactionTypeComponent implements OnInit {
	selectedTransaction: any;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }

  close(): void {
  	//this.dialog.close();
  }

  selectTransaction(transactionType): void {
    //this.dialog.close();
    this.router.navigateByUrl('/transactions/create', { state: { transactionType: transactionType } });
  }
}
