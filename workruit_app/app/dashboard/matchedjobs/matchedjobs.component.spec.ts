import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedjobsComponent } from './matchedjobs.component';

describe('MatchedjobsComponent', () => {
  let component: MatchedjobsComponent;
  let fixture: ComponentFixture<MatchedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
