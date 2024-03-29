import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailesComponent } from './client-detailes.component';

describe('ClientDetailesComponent', () => {
  let component: ClientDetailesComponent;
  let fixture: ComponentFixture<ClientDetailesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailesComponent]
    });
    fixture = TestBed.createComponent(ClientDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
