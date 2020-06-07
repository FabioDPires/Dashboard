import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentSuppliersComponent } from './spent-suppliers.component';

describe('SpentSuppliersComponent', () => {
  let component: SpentSuppliersComponent;
  let fixture: ComponentFixture<SpentSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpentSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpentSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
