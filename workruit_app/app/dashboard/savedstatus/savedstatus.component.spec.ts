import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedstatusComponent } from './savedstatus.component';

describe('SavedstatusComponent', () => {
  let component: SavedstatusComponent;
  let fixture: ComponentFixture<SavedstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
