import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/dialog/dialog-ref';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
	constructor(private dialog: DialogRef) {}

  public ngOnInit(): void {}

  public close(deleteAccount: boolean): void {
  	this.dialog.close(deleteAccount);
  }
}
