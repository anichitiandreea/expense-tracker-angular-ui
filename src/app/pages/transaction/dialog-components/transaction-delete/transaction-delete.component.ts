import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss']
})
export class TransactionDeleteComponent implements OnInit {

  constructor(private dialog: NbDialogRef<TransactionDeleteComponent>) {
  }

  public ngOnInit(): void {
  }

  public close(deleteTransaction: boolean): void {
  	this.dialog.close(deleteTransaction);
  }
}
