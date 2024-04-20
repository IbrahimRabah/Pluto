import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderIntervieweeComponent } from './leader-interviewee.component';

describe('LeaderIntervieweeComponent', () => {
  let component: LeaderIntervieweeComponent;
  let fixture: ComponentFixture<LeaderIntervieweeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderIntervieweeComponent]
    });
    fixture = TestBed.createComponent(LeaderIntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
