import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
	accounts: any;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  	this.accountService
    	.get()
    	.subscribe(response => {
    	  this.accounts = response;
    	});
  }
}
