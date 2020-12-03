import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
	constructor(
    private dialog: NbDialogRef<CategoryDeleteComponent>,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  close(deleteTransaction: boolean): void {
  	this.dialog.close(deleteTransaction);
  }
}
