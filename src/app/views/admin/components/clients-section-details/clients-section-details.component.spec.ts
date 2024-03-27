import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSectionDetailsComponent } from './clients-section-details.component';

describe('ClientsSectionDetailsComponent', () => {
  let component: ClientsSectionDetailsComponent;
  let fixture: ComponentFixture<ClientsSectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsSectionDetailsComponent]
    });
    fixture = TestBed.createComponent(ClientsSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
