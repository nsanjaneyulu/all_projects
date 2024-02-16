import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantintrestedComponent } from './applicantintrested.component';

describe('ApplicantintrestedComponent', () => {
  let component: ApplicantintrestedComponent;
  let fixture: ComponentFixture<ApplicantintrestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantintrestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantintrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
