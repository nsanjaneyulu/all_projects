import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentFormatComponent } from './employment-format.component';

describe('EmploymentFormatComponent', () => {
  let component: EmploymentFormatComponent;
  let fixture: ComponentFixture<EmploymentFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
