import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aside.MenuComponent } from './aside.menu.component';

describe('Aside.MenuComponent', () => {
  let component: Aside.MenuComponent;
  let fixture: ComponentFixture<Aside.MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aside.MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aside.MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
