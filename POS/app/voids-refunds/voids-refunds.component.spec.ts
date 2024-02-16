import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidsRefundsComponent } from './voids-refunds.component';

describe('VoidsRefundsComponent', () => {
  let component: VoidsRefundsComponent;
  let fixture: ComponentFixture<VoidsRefundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidsRefundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidsRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
