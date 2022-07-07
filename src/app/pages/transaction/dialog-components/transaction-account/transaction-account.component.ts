import { Component, OnInit } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction-account',
  templateUrl: './transaction-account.component.html',
  styleUrls: ['./transaction-account.component.scss']
})
export class TransactionAccountComponent implements OnInit {
	public accounts: any;

	private activeAccount: any;

  constructor(
  	private dialog: NbDialogRef<TransactionAccountComponent>,
  	private accountService: AccountService) {
  }

  public ngOnInit(): void {
  	this.accountService
  		.get()
  		.subscribe(response => {
  			this.accounts = response;
  		})
  }

  public close(): void {
  	this.dialog.close();
  }

  public chooseCategory(account): void {
    this.accounts.forEach(function (value) {
      value.active = "";
    });

    account.active = "dialog-inner-active";
    this.activeAccount = account;
  }

  public selectCategory(): void {
    this.dialog.close(this.activeAccount);
  }
}
