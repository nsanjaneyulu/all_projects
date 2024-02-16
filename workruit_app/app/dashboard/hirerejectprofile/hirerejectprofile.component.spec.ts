import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirerejectprofileComponent } from './hirerejectprofile.component';

describe('HirerejectprofileComponent', () => {
  let component: HirerejectprofileComponent;
  let fixture: ComponentFixture<HirerejectprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HirerejectprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HirerejectprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
