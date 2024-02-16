import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLayoutPage } from './screen-layout.page';

describe('ScreenLayoutPage', () => {
  let component: ScreenLayoutPage;
  let fixture: ComponentFixture<ScreenLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenLayoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
