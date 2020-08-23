import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { iconList } from '../icon-list';
import { colorList } from '../color-list';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent implements OnInit {
  currentIconName: string;
  currentColor: string;
  iconList = iconList;
  colorList = colorList;

  constructor(protected dialogRef: NbDialogRef<CategoryIconComponent>) {
  }

  ngOnInit(): void {
  }

  chooseIcon(event: any, icon: any): void {
  	if(event.target.className === "icon-inner-container") {
  		this.currentIconName = event.target.firstChild.className;
  	}
  	else {
  		this.currentIconName = event.target.className;
  	}

  	this.iconList.forEach(function (value) {
		  value.active = "";
		});

		icon.active = "icon-active";
  }

  chooseColor(event: any, color: any) {
  	this.currentColor = event.target.style.backgroundColor;

    this.colorList.forEach(function (value) {
      value.active = "";
    });

    color.active = "color-active";
  }

  close(): void {
  	this.dialogRef.close();
  }

  selectIcon(): void {
  	this.dialogRef.close({iconName: this.currentIconName, iconColor: this.currentColor });
  }

}
