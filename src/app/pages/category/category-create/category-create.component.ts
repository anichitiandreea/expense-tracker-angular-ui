import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CategoryIconComponent } from '../dialog-components/category-icon/category-icon.component';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  iconName: string;
  iconColor: string;
  constructor(private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
  }

  openIconDialog() {
    this.dialogService.open(CategoryIconComponent, {
    	closeOnBackdropClick:false
    })
    .onClose
    .subscribe(response => {
    	this.iconName = (response.iconName != undefined) 
      ? response.iconName 
      : this.iconName;
      
    	this.iconColor = (response.iconColor != undefined) 
      ? response.iconColor 
      : this.iconColor;
    });
  }

}
