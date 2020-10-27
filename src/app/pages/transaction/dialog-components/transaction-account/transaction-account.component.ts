import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction-account',
  templateUrl: './transaction-account.component.html',
  styleUrls: ['./transaction-account.component.scss']
})
export class TransactionAccountComponent implements OnInit {
	accounts: any;
	activeAccount: any;
  constructor(
  	private dialog: NbDialogRef<TransactionAccountComponent>,
  	private accoutnService: AccountService) {

  }

  ngOnInit(): void {
  	this.accoutnService
  		.get()
  		.subscribe(response => {
  			this.accounts = response;
  		})
  }

  close(): void {
  	this.dialog.close();
  }

  chooseCategory(account): void {
    this.accounts.forEach(function (value) {
      value.active = "";
    });

    account.active = "category-active";
    this.activeAccount = account;
  }

  selectCategory(): void {
    this.dialog.close(this.activeAccount);
  }
}
