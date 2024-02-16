import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimalRetailComponent } from './primal-retail.component';

describe('PrimalRetailComponent', () => {
  let component: PrimalRetailComponent;
  let fixture: ComponentFixture<PrimalRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimalRetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimalRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
