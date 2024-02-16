import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFileImportComponent } from './attendance-file-import.component';

describe('AttendanceFileImportComponent', () => {
  let component: AttendanceFileImportComponent;
  let fixture: ComponentFixture<AttendanceFileImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceFileImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
