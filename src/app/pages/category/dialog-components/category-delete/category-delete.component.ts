import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
	constructor() {
  }

  public ngOnInit(): void { }

  public close(deleteTransaction: boolean): void {
  	//this.dialog.close(deleteTransaction);
  }
}
