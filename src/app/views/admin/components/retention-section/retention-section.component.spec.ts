import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionSectionComponent } from './retention-section.component';

describe('RetentionSectionComponent', () => {
  let component: RetentionSectionComponent;
  let fixture: ComponentFixture<RetentionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetentionSectionComponent]
    });
    fixture = TestBed.createComponent(RetentionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
