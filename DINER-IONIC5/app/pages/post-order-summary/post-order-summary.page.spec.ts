import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOrderSummaryPage } from './post-order-summary.page';

describe('PostOrderSummaryPage', () => {
  let component: PostOrderSummaryPage;
  let fixture: ComponentFixture<PostOrderSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOrderSummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOrderSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
