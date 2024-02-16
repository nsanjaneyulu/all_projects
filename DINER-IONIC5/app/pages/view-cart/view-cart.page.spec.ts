import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartPage } from './view-cart.page';

describe('ViewCartPage', () => {
  let component: ViewCartPage;
  let fixture: ComponentFixture<ViewCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
