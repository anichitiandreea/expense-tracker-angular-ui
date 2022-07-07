import { Component, OnInit } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
	constructor(
    private dialog: NbDialogRef<AccountDeleteComponent>) {
  }

  public ngOnInit(): void { }

  public close(deleteAccount: boolean): void {
  	this.dialog.close(deleteAccount);
  }
}
