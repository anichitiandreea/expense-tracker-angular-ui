import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
  	this.categoryService
    	.get()
    	.subscribe(response => {
    	  this.categories = response;
    	});
  }
}
