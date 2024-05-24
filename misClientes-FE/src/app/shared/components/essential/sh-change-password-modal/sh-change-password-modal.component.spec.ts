import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShChangePasswordModalComponent } from './sh-change-password-modal.component';

describe('ShChangePasswordModalComponent', () => {
  let component: ShChangePasswordModalComponent;
  let fixture: ComponentFixture<ShChangePasswordModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShChangePasswordModalComponent]
    });
    fixture = TestBed.createComponent(ShChangePasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
