import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
 menu = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Transactions',
    icon: 'arrow-back',
    link: '/transactions',
    home: true,
  },
  {
    title: 'Accounts',
    icon: 'credit-card',
    link: '/accounts',
    home: true,
  },
  {
    title: 'Statistics',
    icon: 'bar-chart-outline',
    link: '/statistics',
    home: true,
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
