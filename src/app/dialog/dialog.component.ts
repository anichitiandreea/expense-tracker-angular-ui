import { ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { InsertionDirective } from './insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  private _onClose = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.changeDetector.detectChanges();
  }

  onOverlayClick(event: MouseEvent) {
    this.close();
  }

  onDialogClick(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentType);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close(): void {
    this._onClose.next(false);
  }
}
