import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipspayPage } from './tipspay.page';

describe('TipspayPage', () => {
  let component: TipspayPage;
  let fixture: ComponentFixture<TipspayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipspayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipspayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
