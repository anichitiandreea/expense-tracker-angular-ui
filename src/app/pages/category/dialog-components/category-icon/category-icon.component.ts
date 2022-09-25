import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/dialog/dialog-ref';

import { colorList } from '../color-list';
import {iconList} from '../icon-list';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent implements OnInit {
  public currentIconName: string;
  public currentColor: string;
  public iconList: any = iconList;
  public colorList = colorList;

  constructor(private dialog: DialogRef) {}

  public ngOnInit(): void {}

  public chooseIcon(event: any, icon: any): void {
  	this.currentIconName = icon.class;

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
  	this.dialog.close();
  }

  public selectIcon(): void {
    this.dialog.close({iconName: this.currentIconName, iconColor: this.currentColor });
  }
}
