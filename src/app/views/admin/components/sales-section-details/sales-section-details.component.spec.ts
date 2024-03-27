import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSectionDetailsComponent } from './sales-section-details.component';

describe('SalesSectionDetailsComponent', () => {
  let component: SalesSectionDetailsComponent;
  let fixture: ComponentFixture<SalesSectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesSectionDetailsComponent]
    });
    fixture = TestBed.createComponent(SalesSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
