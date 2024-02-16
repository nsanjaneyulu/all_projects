import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSelectionPage } from './payment-selection.page';

describe('PaymentSelectionPage', () => {
  let component: PaymentSelectionPage;
  let fixture: ComponentFixture<PaymentSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
