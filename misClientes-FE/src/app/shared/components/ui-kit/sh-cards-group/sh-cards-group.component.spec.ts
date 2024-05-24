import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShCardsGroupComponent } from './sh-cards-group.component';

describe('ShCardsGroupComponent', () => {
  let component: ShCardsGroupComponent;
  let fixture: ComponentFixture<ShCardsGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShCardsGroupComponent]
    });
    fixture = TestBed.createComponent(ShCardsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
