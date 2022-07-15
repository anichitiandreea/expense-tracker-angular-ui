import { Component, OnInit } from '@angular/core';

import { colorList } from '../color-list';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent implements OnInit {
  public currentIconName: string;
  public currentColor: string;
  public iconList: any;
  public colorList = colorList;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public chooseIcon(event: any, icon: any): void {
  	if(event.target.className === "icon-inner-container") {
  		this.currentIconName = event.target.firstChild.className;
  	}
  	else {
  		this.currentIconName = event.target.className;
  	}

  	this.iconList.forEach(function (value: { active: string; }) {
		  value.active = "";
		});

		icon.active = "icon-active";
  }

  public chooseColor(event: any, color: any): void {
  	this.currentColor = event.target.style.backgroundColor;

    this.colorList.forEach(function (value) {
      value.active = "";
    });

    color.active = "color-active";
  }

  public close(): void {
  	//this.dialog.close();
  }

  public selectIcon(): void {
  	//this.dialog.close({iconName: this.currentIconName, iconColor: this.currentColor });
  }
}
