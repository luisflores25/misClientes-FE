import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShSimpleModalComponent } from './sh-simple-modal.component';

describe('ShSimpleModalComponent', () => {
  let component: ShSimpleModalComponent;
  let fixture: ComponentFixture<ShSimpleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShSimpleModalComponent]
    });
    fixture = TestBed.createComponent(ShSimpleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
