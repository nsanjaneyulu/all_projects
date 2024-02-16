import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledinterviewComponent } from './scheduledinterview.component';

describe('ScheduledinterviewComponent', () => {
  let component: ScheduledinterviewComponent;
  let fixture: ComponentFixture<ScheduledinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledinterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
