import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShCardComponent } from './sh-card.component';

describe('ShCardComponent', () => {
  let component: ShCardComponent;
  let fixture: ComponentFixture<ShCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShCardComponent]
    });
    fixture = TestBed.createComponent(ShCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
