import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductsMoneyComponent } from './top-products-money.component';

describe('TopProductsMoneyComponent', () => {
  let component: TopProductsMoneyComponent;
  let fixture: ComponentFixture<TopProductsMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProductsMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProductsMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
