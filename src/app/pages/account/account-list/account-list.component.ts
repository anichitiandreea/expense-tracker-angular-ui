import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog.service';

import { Account } from 'src/app/model/account';

import { AccountService } from 'src/app/services/account.service';
import { AccountDeleteComponent } from '../dialog-components/account-delete/account-delete.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
	public accounts: Account[] = [];
  constructor(
    private accountService: AccountService,
    private dialogService: DialogService) {
  }

  public ngOnInit(): void {
  	this.accountService
    	.get()
    	.subscribe(response => {
    	  this.accounts = response;
    	});
  }

  public openDeleteAccountDialog(accountId: string): void {
    const dialog = this.dialogService.open(AccountDeleteComponent);
    
    dialog.afterClosed
    .subscribe(response => {
      if (response) {
        this.accountService
          .delete(accountId)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }
}
