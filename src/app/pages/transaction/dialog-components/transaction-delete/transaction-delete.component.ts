import { Component, OnInit } from '@angular/core';

import { DialogRef } from 'src/app/dialog/dialog-ref';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss']
})
export class TransactionDeleteComponent implements OnInit {
  constructor(public dialog: DialogRef) {}

  public ngOnInit(): void {}

  public close(deleteTransaction: boolean): void {
    this.dialog.close(deleteTransaction);
  }
}
