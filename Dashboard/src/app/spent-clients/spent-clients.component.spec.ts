import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentClientsComponent } from './spent-clients.component';

describe('SpentClientsComponent', () => {
  let component: SpentClientsComponent;
  let fixture: ComponentFixture<SpentClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpentClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpentClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
