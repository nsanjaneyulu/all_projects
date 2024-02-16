import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPreformattedComponent } from './request-preformatted.component';

describe('RequestPreformattedComponent', () => {
  let component: RequestPreformattedComponent;
  let fixture: ComponentFixture<RequestPreformattedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPreformattedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPreformattedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
