import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderSectionDetailsComponent } from './leader-section-details.component';

describe('LeaderSectionDetailsComponent', () => {
  let component: LeaderSectionDetailsComponent;
  let fixture: ComponentFixture<LeaderSectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderSectionDetailsComponent]
    });
    fixture = TestBed.createComponent(LeaderSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
