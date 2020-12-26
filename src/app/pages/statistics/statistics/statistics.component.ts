import { Component, OnInit } from '@angular/core';

import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	categories: any;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
  	let date = new Date(), currentMonth = date.getMonth(), currentYear = date.getFullYear();
    let fromDate = new Date(currentYear, currentMonth, 1);
    let toDate = new Date(currentYear, currentMonth + 1, 1);

    console.log(fromDate)
    console.log(toDate)

  	this.statisticsService.get(fromDate.toISOString(), toDate.toISOString())
  		.subscribe(response => {
  			this.categories = response;
  		})
  }

}
