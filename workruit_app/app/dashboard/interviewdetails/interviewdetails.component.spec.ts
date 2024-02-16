import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewdetailsComponent } from './interviewdetails.component';

describe('InterviewdetailsComponent', () => {
  let component: InterviewdetailsComponent;
  let fixture: ComponentFixture<InterviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
