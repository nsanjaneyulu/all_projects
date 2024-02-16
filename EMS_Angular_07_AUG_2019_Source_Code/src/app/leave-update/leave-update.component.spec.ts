import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveUpdateComponent } from './leave-update.component';

describe('LeaveUpdateComponent', () => {
  let component: LeaveUpdateComponent;
  let fixture: ComponentFixture<LeaveUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
