import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeComponent } from './interviewee.component';

describe('IntervieweeComponent', () => {
  let component: IntervieweeComponent;
  let fixture: ComponentFixture<IntervieweeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervieweeComponent]
    });
    fixture = TestBed.createComponent(IntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
