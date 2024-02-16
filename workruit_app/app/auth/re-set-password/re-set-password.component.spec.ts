import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSetPasswordComponent } from './re-set-password.component';

describe('ReSetPasswordComponent', () => {
  let component: ReSetPasswordComponent;
  let fixture: ComponentFixture<ReSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReSetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
