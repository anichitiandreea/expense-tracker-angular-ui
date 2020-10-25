import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: NbMenuItem[] = [
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
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
