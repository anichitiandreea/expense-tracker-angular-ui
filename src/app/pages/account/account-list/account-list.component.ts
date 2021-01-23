import { Component, OnInit } from '@angular/core';

import { NbDialogService } from '@nebular/theme';

import { AccountService } from 'src/app/services/account.service';
import { AccountDeleteComponent } from '../dialog-components/account-delete/account-delete.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
	accounts: any;
  constructor(
    private accountService: AccountService,
    private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
  	this.accountService
    	.get()
    	.subscribe(response => {
    	  this.accounts = response;
    	});
  }

  openDeleteAccountDialog(accountId: string): void {
    this.dialogService.open(AccountDeleteComponent, {
      autoFocus: false,
      closeOnBackdropClick: false
    })
    .onClose
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
