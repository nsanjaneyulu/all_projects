import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstatusComponent } from './jobstatus.component';

describe('JobstatusComponent', () => {
  let component: JobstatusComponent;
  let fixture: ComponentFixture<JobstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
