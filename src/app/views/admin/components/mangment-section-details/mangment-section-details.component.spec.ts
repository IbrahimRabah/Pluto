import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangmentSectionDetailsComponent } from './mangment-section-details.component';

describe('MangmentSectionDetailsComponent', () => {
  let component: MangmentSectionDetailsComponent;
  let fixture: ComponentFixture<MangmentSectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangmentSectionDetailsComponent]
    });
    fixture = TestBed.createComponent(MangmentSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
