import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss']
})
export class TransactionDeleteComponent implements OnInit {

  constructor(
    private dialog: NbDialogRef<TransactionDeleteComponent>,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  close(deleteTransaction: boolean): void {
  	this.dialog.close(deleteTransaction);
  }
}
