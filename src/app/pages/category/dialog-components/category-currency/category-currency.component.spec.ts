import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCurrencyComponent } from './category-currency.component';

describe('CategoryCurrencyComponent', () => {
  let component: CategoryCurrencyComponent;
  let fixture: ComponentFixture<CategoryCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
