import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAccountComponent } from './transaction-account.component';

describe('TransactionAccountComponent', () => {
  let component: TransactionAccountComponent;
  let fixture: ComponentFixture<TransactionAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
