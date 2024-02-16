import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountsComponent } from './add-discounts.component';

describe('AddDiscountsComponent', () => {
  let component: AddDiscountsComponent;
  let fixture: ComponentFixture<AddDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
