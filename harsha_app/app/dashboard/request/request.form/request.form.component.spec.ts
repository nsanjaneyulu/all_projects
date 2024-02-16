import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Request.FormComponent } from './request.form.component';

describe('Request.FormComponent', () => {
  let component: Request.FormComponent;
  let fixture: ComponentFixture<Request.FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Request.FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Request.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
