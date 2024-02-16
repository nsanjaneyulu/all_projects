import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDiscountComponent } from './assign-discount.component';

describe('AssignDiscountComponent', () => {
  let component: AssignDiscountComponent;
  let fixture: ComponentFixture<AssignDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
