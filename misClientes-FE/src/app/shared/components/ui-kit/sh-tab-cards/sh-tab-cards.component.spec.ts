import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShTabCardsComponent } from './sh-tab-cards.component';

describe('ShTabCardsComponent', () => {
  let component: ShTabCardsComponent;
  let fixture: ComponentFixture<ShTabCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShTabCardsComponent]
    });
    fixture = TestBed.createComponent(ShTabCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
