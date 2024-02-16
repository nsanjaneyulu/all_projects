import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDiscountDetailsComponent } from './assigned-discount-details.component';

describe('AssignedDiscountDetailsComponent', () => {
  let component: AssignedDiscountDetailsComponent;
  let fixture: ComponentFixture<AssignedDiscountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedDiscountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
