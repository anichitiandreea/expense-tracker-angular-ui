import { Component, OnInit } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
	constructor(
    private dialog: NbDialogRef<CategoryDeleteComponent>) {
  }

  public ngOnInit(): void { }

  public close(deleteTransaction: boolean): void {
  	this.dialog.close(deleteTransaction);
  }
}
