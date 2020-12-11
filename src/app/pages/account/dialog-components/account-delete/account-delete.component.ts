import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
	constructor(
    private dialog: NbDialogRef<AccountDeleteComponent>,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  close(deleteAccount: boolean): void {
  	this.dialog.close(deleteAccount);
  }
}
