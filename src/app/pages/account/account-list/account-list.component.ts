import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
	categories: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  	this.categoryService
    	.get()
    	.subscribe(response => {
    	  this.categories = response;
    	});
  }

}
