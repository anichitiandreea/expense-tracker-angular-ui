import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/dialog/dialog-ref';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
	constructor(private dialog: DialogRef) {}

  public ngOnInit(): void {}

  public close(deleteTransaction: boolean): void {
  	this.dialog.close(deleteTransaction);
  }
}
