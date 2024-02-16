import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MallselectionPage } from './mallselection.page';

describe('MallselectionPage', () => {
  let component: MallselectionPage;
  let fixture: ComponentFixture<MallselectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallselectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MallselectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
