import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieeSectionComponent } from './interviee-section.component';

describe('IntervieeSectionComponent', () => {
  let component: IntervieeSectionComponent;
  let fixture: ComponentFixture<IntervieeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervieeSectionComponent]
    });
    fixture = TestBed.createComponent(IntervieeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
