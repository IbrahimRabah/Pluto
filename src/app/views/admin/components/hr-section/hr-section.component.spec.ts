import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSectionComponent } from './hr-section.component';

describe('HrSectionComponent', () => {
  let component: HrSectionComponent;
  let fixture: ComponentFixture<HrSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrSectionComponent]
    });
    fixture = TestBed.createComponent(HrSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
