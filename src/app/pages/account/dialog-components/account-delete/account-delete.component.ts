import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
	constructor() {
  }

  public ngOnInit(): void { }

  public close(deleteAccount: boolean): void {
  	//this.dialog.close(deleteAccount);
  }
}
